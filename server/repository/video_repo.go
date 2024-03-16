package repository

import "github.com/trungnd3/remitano-videos/model"

type VideoRepo interface {
	Save(video model.Video)
	Update(video model.Video)
	Delete(videoId int)
	FindById(videoId int) (model.Video, error)
	FindAll() []model.Video
}