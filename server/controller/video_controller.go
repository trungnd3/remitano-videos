package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
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
	// createVideoRequest := request.CreateVideo{}
	// err := ctx.ShouldBindJSON(&createUserRequest)
	// helper.ErrorPanic(err)

	err := vc.VideoService.Share("www.youtube.com/watch?v=QY2Sj7-MMgM")

	apiResponse := response.Api{
		Code: http.StatusOK,
		Status: "OK",
		Data: nil,
	}
	if err != nil {
		apiResponse.Code = http.StatusConflict
		apiResponse.Status = err.Error()
	}
	ctx.Header("Content-Type", "application/json")
	ctx.JSON(apiResponse.Code, apiResponse)
}
