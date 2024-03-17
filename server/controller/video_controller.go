package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog/log"
	"github.com/trungnd3/remitano-videos/data/request"
	"github.com/trungnd3/remitano-videos/data/response"
	"github.com/trungnd3/remitano-videos/helper"
	"github.com/trungnd3/remitano-videos/service"
)

type VideoController struct {
	VideoService service.VideoService
}

func NewVideoController(videoService service.VideoService) *VideoController {
	return &VideoController{
		VideoService: videoService,
	}
}

func (vc *VideoController) Share(ctx *gin.Context) {
	// createVideoRequest := request.CreateVideo{}
	// err := ctx.ShouldBindJSON(&createUserRequest)
	// helper.ErrorPanic(err)
	apiResponse := response.Api{
		Code: http.StatusOK,
		Status: "OK",
		Data: nil,
	}
	log.Info().Msg("sharing video...")
	username, exists := ctx.Get("username")
	if !exists {
		apiResponse.Code = http.StatusForbidden
		apiResponse.Status = "Not authenticated"
		ctx.Header("Content-Type", "application/json")
		ctx.JSON(apiResponse.Code, apiResponse)
		return
	}
	usernameStr, _ := username.(string)
	log.Info().Msg(usernameStr)

	shareRequest := request.ShareVideo{}
	err := ctx.ShouldBindJSON(&shareRequest)
	helper.ErrorPanic(err)

	err = vc.VideoService.Share(shareRequest.Url, usernameStr)

	if err != nil {
		apiResponse.Code = http.StatusConflict
		apiResponse.Status = err.Error()
	}
	ctx.Header("Content-Type", "application/json")
	ctx.JSON(apiResponse.Code, apiResponse)
}
