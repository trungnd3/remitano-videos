package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog/log"
	"github.com/trungnd3/remitano-videos/data/request"
	"github.com/trungnd3/remitano-videos/data/response"
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
	apiResponse := response.Api{
		Code: http.StatusOK,
		Status: "OK",
		Data: nil,
	}
	username, exists := ctx.Get("username")
	if !exists {
		apiResponse.Code = http.StatusForbidden
		apiResponse.Status = "Not authenticated"
		ctx.Header("Content-Type", "application/json")
		ctx.JSON(apiResponse.Code, apiResponse)
		return
	}
	usernameStr, _ := username.(string)

	shareRequest := request.ShareVideo{}
	err := ctx.ShouldBindJSON(&shareRequest)
	if err != nil {
		apiResponse.Code = http.StatusBadRequest
		apiResponse.Status = "Bad request"
		ctx.Header("Content-Type", "application/json")
		ctx.JSON(apiResponse.Code, apiResponse)
		return
	}
	
	video, err := vc.VideoService.Share(shareRequest.Url, usernameStr)
	
	if err != nil {
		apiResponse.Code = http.StatusConflict
		apiResponse.Status = err.Error()
		ctx.Header("Content-Type", "application/json")
		ctx.JSON(apiResponse.Code, apiResponse)
		return
	}
	apiResponse.Data = video
	ctx.Header("Content-Type", "application/json")
	ctx.JSON(apiResponse.Code, apiResponse)
}

// FindAll Controller
func (vc *VideoController) FindAll(ctx *gin.Context) {
	log.Info().Msg("finding videos...")
	videosResponse := vc.VideoService.FindAll()
	
	apiResponse := response.Api{
		Code: http.StatusOK,
		Status: "OK",
		Data: videosResponse,
	}
	ctx.Header("Content-Type", "application/json")
	ctx.JSON(apiResponse.Code, apiResponse)
}


// Prefer Controller
func (vc *VideoController) Prefer(ctx *gin.Context) {
	apiResponse := response.Api{
		Code: http.StatusOK,
		Status: "OK",
		Data: nil,
	}

	username, exists := ctx.Get("username")
	if !exists {
		apiResponse.Code = http.StatusForbidden
		apiResponse.Status = "Not authenticated"
		ctx.Header("Content-Type", "application/json")
		ctx.JSON(apiResponse.Code, apiResponse)
		return
	}
	usernameStr, _ := username.(string)

	preferRequest := request.PreferVideo{}
	err := ctx.ShouldBindJSON(&preferRequest)
	if err != nil {
		apiResponse.Code = http.StatusBadRequest
		apiResponse.Status = "Bad request"
		ctx.Header("Content-Type", "application/json")
		ctx.JSON(apiResponse.Code, apiResponse)
		return
	}

	likes, dislikes, err := vc.VideoService.Prefer(usernameStr, preferRequest.Id, preferRequest.Liked)
	if err != nil {
		apiResponse.Code = http.StatusInternalServerError
		apiResponse.Status = err.Error()
		ctx.Header("Content-Type", "application/json")
		ctx.JSON(apiResponse.Code, apiResponse)
		return
	}

	apiResponse.Data = &response.PreferVideo{
		Likes: likes,
		Dislikes: dislikes,
	}
	ctx.Header("Content-Type", "application/json")
	ctx.JSON(apiResponse.Code, apiResponse)
}
