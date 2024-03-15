package controller

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog/log"
	"github.com/trungnd3/remitano-videos/data/request"
	"github.com/trungnd3/remitano-videos/data/response"
	"github.com/trungnd3/remitano-videos/helper"
	"github.com/trungnd3/remitano-videos/service"
)

type UserController struct {
	UserService service.UserService
}

func NewUserController(service service.UserService) *UserController {
	return &UserController{
		UserService: service,
	}
}

// Create Controller
func (uc *UserController) Create(ctx *gin.Context) {
	log.Info().Msg("user creating...")
	createUserRequest := request.CreateUserRequest{}
	err := ctx.ShouldBindJSON(&createUserRequest)
	helper.ErrorPanic(err)

	uc.UserService.Create(createUserRequest)
	apiResponse := response.ApiResponse{
		Code: http.StatusOK,
		Status: "OK",
		Data: nil,
	}
	ctx.Header("Content-Type", "application/json")
	ctx.JSON(http.StatusOK, apiResponse)
}

// Delete Controller
func (uc *UserController) Delete(ctx *gin.Context) {
	log.Info().Msg("deleting user...")
	userId := ctx.Param("userId")
	id, err := strconv.Atoi(userId)
	helper.ErrorPanic(err)
	uc.UserService.Delete(id)

	apiResponse := response.ApiResponse{
		Code: http.StatusOK,
		Status: "OK",
		Data: nil,
	}
	ctx.Header("Content-Type", "application/json")
	ctx.JSON(http.StatusOK, apiResponse)
}

// FindById Controller
func (uc *UserController) FindById(ctx *gin.Context) {
	log.Info().Msg("finding user...")
	userId := ctx.Param("userId")
	id, err := strconv.Atoi(userId)
	helper.ErrorPanic(err)

	userResponse := uc.UserService.FindById(id)

	apiResponse := response.ApiResponse{
		Code: http.StatusOK,
		Status: "OK",
		Data: userResponse,
	}
	ctx.Header("Content-Type", "application/json")
	ctx.JSON(http.StatusOK, apiResponse)
}
