package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog/log"
	"github.com/trungnd3/remitano-videos/helper"
)

func main() {
	log.Info().Msg("Server started!")

	routes := gin.Default()

	routes.GET("/", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, "Hello world12")
	})

	server := &http.Server{
		Addr: ":8080",
		Handler: routes,
	}

	err := server.ListenAndServe()
	helper.ErrorPanic(err)
}