package service

import (
	"github.com/trungnd3/remitano-videos/data/response"
	"gorm.io/datatypes"
)

type VideoService interface {
	Share(videoUrl string, username string) (*response.Video, error)
	FindAll() []response.Video
	FindById(videoId int) response.Video
	Prefer(username string, videoId int, liked bool) (datatypes.JSONSlice[int], datatypes.JSONSlice[int], error)
	Like() int
	Dislike() int
}