package repository

import (
	"context"
	"errors"
	"time"

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
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var vid model.Video
	result := v.Db.WithContext(ctx).Where("id = ?", videoId).Delete(&vid)
	helper.ErrorPanic(result.Error)
}

// FindAll implements VideoRepo.
func (v *VideoRepoImpl) FindAll() []model.Video {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var videos []model.Video
	result := v.Db.WithContext(ctx).Find(&videos)
	helper.ErrorPanic(result.Error)
	return videos
}

// FindById implements VideoRepo.
func (v *VideoRepoImpl) FindById(videoId int) (model.Video, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var video model.Video
	result := v.Db.WithContext(ctx).Find(&video, videoId)
	if result != nil {
		return video, nil
	}
	return video, errors.New("Video not found")
}

// FindByYoutubeId implements VideoRepo.
func (v *VideoRepoImpl) FindByYoutubeId(youtubeId string) (*model.Video, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var vid = &model.Video{}
	v.Db.WithContext(ctx).Where(&model.Video{YoutubeId: youtubeId}).First(&vid)
	if vid.Id > 0 {
		return vid, nil
	}
	return nil, errors.New("Video not found")
}

// Save implements VideoRepo.
func (v *VideoRepoImpl) Save(video model.Video) (int, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	result := v.Db.WithContext(ctx).Create(&video)
	return video.Id, result.Error
}

// Update implements VideoRepo.
func (v *VideoRepoImpl) Update(video model.Video) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var updateVideo = request.UpdateVideo{
		Id: video.Id,
		Title: video.Title,
		Description: video.Description,
		ThumbnailURL: video.ThumbnailURL,
		SourceURL: video.SourceURL,
		Likes: video.Likes,
		Dislikes: video.Dislikes,
	}

	result := v.Db.WithContext(ctx).Model(&video).Updates(updateVideo)
	helper.ErrorPanic(result.Error)
}
