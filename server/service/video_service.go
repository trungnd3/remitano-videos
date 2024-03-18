package service

import "github.com/trungnd3/remitano-videos/data/response"

type VideoService interface {
	Share(videoUrl string, username string) (*response.Video, error)
	FindAll() []response.Video
	FindById(videoId int) response.Video
	Like() int
	Dislike() int
}