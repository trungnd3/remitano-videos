package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/trungnd3/remitano-videos/service"
)

type NotiController struct {
	notiService service.NotiService
	hub *service.Hub
}

func NewNotiController(notiService service.NotiService, hub *service.Hub) *NotiController {
	return &NotiController{
		notiService: notiService,
		hub: hub,
	}
}

func (n *NotiController) ServeWebsocket(ctx *gin.Context) {
		n.notiService.ServeWs(n.hub, ctx.Writer, ctx.Request)
}