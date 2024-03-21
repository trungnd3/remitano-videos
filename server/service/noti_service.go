package service

import (
	"net/http"

	"github.com/gorilla/websocket"
	"github.com/trungnd3/remitano-videos/data/response"
	"github.com/trungnd3/remitano-videos/repository"
)

// Hub maintains the set of active clients and broadcasts messages to the
// clients.
type Hub struct {
	// Registered clients.
	clients map[*Client]bool

	// Inbound messages from the clients.
	broadcast chan *response.Socket

	// Register requests from the clients.
	register chan *Client

	// Unregister requests from clients.
	unregister chan *Client
}

// Client is a middleware between websocket connection and hub
type Client struct {
	id int

	hub *Hub

	// The websocket connection
	conn *websocket.Conn

	// Buffered channel of outbound messages
	// send chan []byte

	sendJson chan *response.Socket

	userRepo	*repository.UserRepo
	videoRepo	*repository.VideoRepo
}

type NotiService interface {
	ServeWs(hub *Hub, w http.ResponseWriter, r *http.Request)
}
