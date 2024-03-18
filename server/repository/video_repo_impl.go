package repository

import (
	"errors"

	"github.com/trungnd3/remitano-videos/data/request"
	"github.com/trungnd3/remitano-videos/helper"
	"github.com/trungnd3/remitano-videos/model"
	"gorm.io/gorm"
)

type VideoRepoImpl struct {
	Db *gorm.DB
}

func NewVideoRepoImpl(Db *gorm.DB) VideoRepo {
	return &VideoRepoImpl{Db: Db}
}

// Delete implements VideoRepo.
func (v *VideoRepoImpl) Delete(videoId int) {
	var vid model.Video
	result := v.Db.Where("id = ?", videoId).Delete(&vid)
	helper.ErrorPanic(result.Error)
}

// FindAll implements VideoRepo.
func (v *VideoRepoImpl) FindAll() []model.Video {
	var videos []model.Video
	result := v.Db.Find(&videos)
	helper.ErrorPanic(result.Error)
	return videos
}

// FindById implements VideoRepo.
func (v *VideoRepoImpl) FindById(videoId int) (model.Video, error) {
	var video model.Video
	result := v.Db.Find(&video, videoId)
	if result != nil {
		return video, nil
	}
	return video, errors.New("Video not found")
}

// FindByYoutubeId implements VideoRepo.
func (v *VideoRepoImpl) FindByYoutubeId(youtubeId string) (*model.Video, error) {
	var vid = &model.Video{}
	v.Db.Where(&model.Video{YoutubeId: youtubeId}).First(&vid)
	if vid.Id > 0 {
		return vid, nil
	}
	return nil, errors.New("Video not found")
}

// Save implements VideoRepo.
func (v *VideoRepoImpl) Save(video model.Video) (int, error) {
	// v.Db.Model(&video).Association("User").Append(&model.User{Username: video.User.Username})
	result := v.Db.Create(&video)
	return video.Id, result.Error
}

// Update implements VideoRepo.
func (v *VideoRepoImpl) Update(video model.Video) {
	var updateVideo = request.UpdateVideo{
		Id: video.Id,
		Title: video.Title,
		Description: video.Description,
		ThumbnailURL: video.ThumbnailURL,
		SourceURL: video.SourceURL,
		Likes: video.Likes,
		Dislikes: video.Dislikes,
	}

	result := v.Db.Model(&video).Updates(updateVideo)
	helper.ErrorPanic(result.Error)
}
