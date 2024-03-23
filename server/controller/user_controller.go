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
	createUserRequest := request.CreateUser{}
	err := ctx.ShouldBindJSON(&createUserRequest)
	helper.ErrorPanic(err)

	id, token, tokenExpiresAt, err := uc.UserService.Create(createUserRequest)

	apiResponse := response.Api{
		Code: http.StatusOK,
		Status: "OK",
		Data: token,
	}
	if err != nil {
		apiResponse.Code = http.StatusConflict
		apiResponse.Status = "Confict"
		apiResponse.Data = err.Error()
		ctx.Header("Content-Type", "application/json")
		ctx.JSON(apiResponse.Code, apiResponse)
		return
	}
	apiResponse.Data = &response.User{
		Id: id,
		Token: token,
		TokenExpiresAt: tokenExpiresAt,
	}
	ctx.Header("Content-Type", "application/json")
	ctx.JSON(apiResponse.Code, apiResponse)
}

// SignIn controller
func (uc *UserController) SignIn(ctx *gin.Context) {
	signInRequest := request.CreateUser{}
	err := ctx.ShouldBindJSON(&signInRequest)
	helper.ErrorPanic(err)

	id, token, tokenExpiresAt, err := uc.UserService.SignIn(signInRequest)
	apiResponse := response.Api{
		Code: http.StatusOK,
		Status: "OK",
		Data: &response.User{
			Id: id,
			Token: token,
			TokenExpiresAt: tokenExpiresAt,
		},
	}
	if err != nil {
		apiResponse.Code = http.StatusNotFound
		apiResponse.Status = "404"
		apiResponse.Data = err.Error()
	}
	ctx.Header("Content-Type", "application/json")
	ctx.JSON(apiResponse.Code, apiResponse)
}

// Delete Controller
func (uc *UserController) Delete(ctx *gin.Context) {
	log.Info().Msg("deleting user...")
	userId := ctx.Param("userId")
	id, err := strconv.Atoi(userId)
	helper.ErrorPanic(err)

	apiResponse := response.Api{
		Code: http.StatusOK,
		Status: "OK",
		Data: nil,
	}
	userResponse := uc.UserService.FindById(id)
	if (userResponse == response.User{}) {
		apiResponse.Code = http.StatusNotFound
		apiResponse.Status = "User not found"
	}

	uc.UserService.Delete(id)
	ctx.Header("Content-Type", "application/json")
	ctx.JSON(apiResponse.Code, apiResponse)
}

// FindById Controller
func (uc *UserController) FindById(ctx *gin.Context) {
	log.Info().Msg("finding user...")
	userId := ctx.Param("userId")
	id, err := strconv.Atoi(userId)
	helper.ErrorPanic(err)

	userResponse := uc.UserService.FindById(id)

	apiResponse := response.Api{
		Code: http.StatusOK,
		Status: "OK",
		Data: userResponse,
	}
	ctx.Header("Content-Type", "application/json")
	ctx.JSON(apiResponse.Code, apiResponse)
}

// FindAll Controller
func (uc *UserController) FindAll(ctx *gin.Context) {
	log.Info().Msg("finding user...")
	usersResponse := uc.UserService.FindAll()
	
	apiResponse := response.Api{
		Code: http.StatusOK,
		Status: "OK",
		Data: usersResponse,
	}
	ctx.Header("Content-Type", "application/json")
	ctx.JSON(apiResponse.Code, apiResponse)
}
