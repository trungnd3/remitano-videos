package service

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/go-playground/validator/v10"
	"github.com/trungnd3/remitano-videos/data/response"
	"github.com/trungnd3/remitano-videos/helper"
	"github.com/trungnd3/remitano-videos/model"
	"github.com/trungnd3/remitano-videos/repository"
)

type VideoServiceImpl struct {
	UserRepo	repository.UserRepo
	VideoRepo repository.VideoRepo
	Validate  *validator.Validate
}

func NewVideoServiceImpl(userRepo repository.UserRepo, videoRepo repository.VideoRepo, validate *validator.Validate) VideoService {
	return &VideoServiceImpl{
		UserRepo: userRepo,
		VideoRepo: videoRepo,
		Validate:  validate,
	}
}

// Share implements VideoService.
func (vs *VideoServiceImpl) Share(videoUrl string, username string) error {
	user, err := vs.UserRepo.FindByUsername(username)
	helper.ErrorPanic(err)
	
	youtubeUrl := "https://www.youtube.com/oembed?url=" + videoUrl + "&format=json"
	resp, err := http.Get(youtubeUrl)	
	if err != nil {
		return err
	}

	//We Read the response body on the line below.
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		 return err
	}

	var ytData response.Youtube

	//Convert the body to type string
	err = json.Unmarshal(body, &ytData)
	helper.ErrorPanic(err)

	video := model.Video{
		Title: ytData.Title,
		Description: ytData.Title,
		ThumbnailURL: ytData.ThumbnailUrl,
		SourceURL: videoUrl,
		UserId: user.Id,
	}
	fmt.Printf("%+v\n", video)

	vs.VideoRepo.Save(video)

	vs.UserRepo.Associate(*user, video)

	return nil
}

// FindAll implements VideoService.
func (vs *VideoServiceImpl) FindAll() []response.Video {
	results := vs.VideoRepo.FindAll()

	var videos []response.Video
	for _, value := range results {
		user, err := vs.UserRepo.FindById(value.UserId)
		if err != nil {
			continue
		}

		video := response.Video{
			Id: value.Id,
			Title: value.Title,
			ThumbnailURL: value.ThumbnailURL,
			SourceURL: value.SourceURL,
			SharedBy: user.Username,
			Likes: value.Likes,
			Dislikes: value.Dislikes,
		}
		videos = append(videos, video)
	}
	return videos
}

// FindById implements VideoService.
func (vs *VideoServiceImpl) FindById(videoId int) response.Video {
	result, err := vs.VideoRepo.FindById(videoId)
	helper.ErrorPanic(err)
	user, err := vs.UserRepo.FindById(result.UserId)
	if err != nil {
		helper.ErrorPanic(err)
	}
	var video = response.Video{
		Id: result.Id,
		Title: result.Title,
		ThumbnailURL: result.ThumbnailURL,
		SourceURL: result.SourceURL,
		SharedBy: user.Username,
		Likes: result.Likes,
		Dislikes: result.Dislikes,
	}
	return video
}

// Like implements VideoService.
func (vs *VideoServiceImpl) Like() int {
	panic("unimplemented")
}

// Dislike implements VideoService.
func (vs *VideoServiceImpl) Dislike() int {
	panic("unimplemented")
}


