package service

import (
	"net/http"
	"os"
	"time"

	"github.com/gorilla/websocket"
	"github.com/rs/zerolog/log"
	"github.com/trungnd3/remitano-videos/data/request"
	"github.com/trungnd3/remitano-videos/data/response"
	"github.com/trungnd3/remitano-videos/helper"
	"github.com/trungnd3/remitano-videos/repository"
)

const (
	// Time allowed to write message to the peer.
	writeWait 			= 10 * time.Second

	// Time allowed to read next pong message from the peer.
	pongWait 				= 60 * time.Second

	// Send pings to peer with this period. Must less than pongWait.
	pingPeriod 			= (pongWait * 9) / 10

	// Maximum message size allowed from peer.
	maxMessageSize	= 512
)

var (
	newline = []byte{'\n'}
	space		= []byte{' '}
)

var upgrader = websocket.Upgrader{
	ReadBufferSize: 1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		origin := r.Header.Get("Origin")
		localPort := os.Getenv("LOCAL_PORT")
		if localPort != "" {
			return origin == "http://" + r.Host + ":" + localPort
		}
		log.Info().Msgf("Origin header: %s", origin)
		log.Info().Msgf("Host: %s", r.Host)
		log.Info().Msgf("Proto: %s", r.Proto)
		log.Info().Msgf("Port: %s", localPort)

		return origin == r.Host
	},
}

type JSONString string

func (j JSONString) MarshalJSON() ([]byte, error) {
    return []byte(j), nil
}

func NewHub() *Hub {
	return &Hub{
		broadcast:	make(chan *response.Socket),
		register: 	make(chan *Client),
		unregister: make(chan *Client),
		clients: 		make(map[*Client]bool),
	}
}

func (h *Hub) Run() {
	for {
		select {
		case client := <-h.register:
			h.clients[client] = true
		case client := <-h.unregister:
			if _, ok := h.clients[client]; ok {
				close(client.sendJson)
				delete(h.clients, client)
			}
		case data := <-h.broadcast:
			for client := range h.clients {
				select {
				case client.sendJson <- data:
				default:
					close(client.sendJson)
					delete(h.clients, client)
				}
			}
		}
	}
}

// readPump pumps the messages from websocket connection to the hub
//
// The application runs readPump in a per-connection goroutine.
// The application ensures that there is at most 1 reader on a connection
// by executing all reads from this goroutine.
func (c *Client) readPump() {
	defer func() {
		c.hub.unregister <- c
		c.conn.Close()
	}()
	c.conn.SetReadLimit(maxMessageSize)
	c.conn.SetReadDeadline(time.Now().Add(pongWait))
	c.conn.SetPongHandler(func(string) error { c.conn.SetReadDeadline(time.Now().Add(pongWait)); return nil })
	for {
		inboundData := &request.Socket{}
		err := c.conn.ReadJSON(inboundData)
		if err != nil {
			log.Info().Msgf("Error message: %s\n", err.Error())
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Info().Msgf("error: %s\n", err.Error())
			}
			break
		}

		claims, errMsg := helper.ValidateToken(inboundData.Auth.Token)
		if errMsg != "" {
			log.Info().Msgf("Error message: %s\n", errMsg)
			break
		}
		user, err := (*c.userRepo).FindByUsername(claims.Username)
		if err != nil {
			log.Info().Msgf("Error message: %s\n", err.Error())
			break
		}
		video, err := (*c.videoRepo).FindById(inboundData.Query.VideoId)
		if err != nil {
			log.Info().Msgf("Error message: %s\n", err.Error())
			break
		}

		responseVideo := &response.Video{
			Id: video.Id,
			Title: video.Title,
			Description: video.Description,
			ThumbnailURL: video.ThumbnailURL,
			SourceURL: video.SourceURL,
			YoutubeId: video.YoutubeId,
			Likes: video.Likes,
			Dislikes: video.Dislikes,
			SharedBy: user.Username,
		}

		outboundData := &response.Socket{
			Type: inboundData.Query.Type,
			Username: user.Username,
			Video: *responseVideo,
		}

		c.hub.broadcast <- outboundData
	}
}

// writePump pumps the message from hub to the websocket connection
//
// A goroutine running writePump is started for each connection.
// The application ensures that there is at most 1 writer to a connection
// by executing all writes from this goroutine.
func (c *Client) writePump() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		c.conn.Close()
	}()
	for {
		select {
		case data, ok := <-c.sendJson:
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))

			if !ok {
				// The hub closed the channel.
				c.conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}

			// Add queued chat messages to the current websocket message.
			c.conn.WriteJSON(data)
		case <-ticker.C:
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if err := c.conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		}
	}
}

type NotiServiceImpl struct {
	UserRepo 	repository.UserRepo
	VideoRepo repository.VideoRepo
}

func NewNotiServiceImpl(userRepo repository.UserRepo, videoRepo repository.VideoRepo) NotiService {
	return &NotiServiceImpl{
		UserRepo:		userRepo,
		VideoRepo:	videoRepo,
	}
}

// ServeWs handles webrequests requests from the peer.
func (n *NotiServiceImpl) ServeWs(hub *Hub, w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Info().Msg(err.Error())
		return
	}

	client := &Client{
		hub: hub,
		conn: conn,
		userRepo: &n.UserRepo,
		videoRepo: &n.VideoRepo,
		sendJson: make(chan *response.Socket, 512)}
	client.hub.register <- client

	// Allow collection of memory referenced by the caller by doing all work in
	// new goroutines.
	go client.writePump()
	go client.readPump()
}