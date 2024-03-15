package main

import (
	"net/http"

	"github.com/go-playground/validator/v10"
	"github.com/rs/zerolog/log"
	"github.com/trungnd3/remitano-videos/config"
	"github.com/trungnd3/remitano-videos/controller"
	_ "github.com/trungnd3/remitano-videos/docs"
	"github.com/trungnd3/remitano-videos/helper"
	"github.com/trungnd3/remitano-videos/model"
	"github.com/trungnd3/remitano-videos/repository"
	"github.com/trungnd3/remitano-videos/router"
	"github.com/trungnd3/remitano-videos/service"
)

// @title				Video Service API
// @version			1.0
// @description Video service API in Go using Gin framework

// @host 				localhost:8080
// @BasePath		/api
func main() {
	log.Info().Msg("Server started!")

	// Database
	db := config.DBConn()
	validate := validator.New()

	db.Table("users").AutoMigrate(&model.User{})

	// Repository
	userRepository := repository.NewUserRepoImpl(db)

	// Service
	userService := service.NewUserServiceImpl(userRepository, validate)

	// Controller
	userController := controller.NewUserController(userService)

	// Router
	routes := router.NewRouter(userController)

	server := &http.Server{
		Addr: ":8080",
		Handler: routes,
	}

	err := server.ListenAndServe()
	helper.ErrorPanic(err)
}