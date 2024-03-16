package service

import (
	"io"
	"net/http"

	"github.com/go-playground/validator/v10"
	"github.com/rs/zerolog/log"
	"github.com/trungnd3/remitano-videos/data/response"
	"github.com/trungnd3/remitano-videos/helper"
	"github.com/trungnd3/remitano-videos/repository"
)

type VideoServiceImpl struct {
	VideoRepo repository.VideoRepo
	Validate  *validator.Validate
}

func NewVideoServiceImpl(videoRepo repository.VideoRepo, validate *validator.Validate) VideoService {
	return &VideoServiceImpl{
		VideoRepo: videoRepo,
		Validate:  validate,
	}
}

// Share implements VideoService.
func (vs *VideoServiceImpl) Share(videoUrl string) error {
	log.Info().Msg("VideoService: " + videoUrl)
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

	//Convert the body to type string
	sb := string(body)
	log.Info().Msg(sb)

	return nil
}

// FindAll implements VideoService.
func (vs *VideoServiceImpl) FindAll() []response.Video {
	results := vs.VideoRepo.FindAll()

	var videos []response.Video
	for _, value := range results {
		video := response.Video{
			Id: value.Id,
			Title: value.Title,
			ThumbnailURL: value.ThumbnailURL,
			SourceURL: value.SourceURL,
			SharedBy: value.SharedBy.Username,
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
	var video = response.Video{
		Id: result.Id,
		Title: result.Title,
		ThumbnailURL: result.ThumbnailURL,
		SourceURL: result.SourceURL,
		SharedBy: result.SharedBy.Username,
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


