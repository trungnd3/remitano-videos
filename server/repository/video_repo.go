package repository

import "github.com/trungnd3/remitano-videos/model"

type VideoRepo interface {
	Save(video model.Video) (int, error)
	Update(video model.Video)
	Delete(videoId int)
	FindById(videoId int) (model.Video, error)
	FindByYoutubeId(youtubeId string) (*model.Video, error)
	FindAll() []model.Video
}