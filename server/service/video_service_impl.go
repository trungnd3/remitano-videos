package service

import (
	"encoding/json"
	"errors"
	"io"
	"net/http"
	"strings"

	"github.com/go-playground/validator/v10"
	"github.com/trungnd3/remitano-videos/data/response"
	"github.com/trungnd3/remitano-videos/helper"
	"github.com/trungnd3/remitano-videos/model"
	"github.com/trungnd3/remitano-videos/repository"
	"gorm.io/datatypes"
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
func (vs *VideoServiceImpl) Share(videoUrl string, username string) (*response.Video, error) {
	user, err := vs.UserRepo.FindByUsername(username)
	if err != nil {
		return nil, err
	}
	
	// Parse youtube video to get non HTTP method url & youtube ID
	parseUrl, youtubeId := vs.handleYoutubeUrl(videoUrl)

	// Find already exist video
	foundVideo, err := vs.VideoRepo.FindByYoutubeId(youtubeId)
	if foundVideo != nil {
		return nil, errors.New("Video is already shared")
	}

	oembedUrl := "https://www.youtube.com/oembed?url=" + parseUrl + "&format=json"
	resp, err := http.Get(oembedUrl)
	if err != nil {
		return nil, err
	}

	//We Read the response body on the line below.
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		 return nil, err
	}

	var ytData response.Youtube

	//Convert the body to type string
	err = json.Unmarshal(body, &ytData)
	if err != nil {
		return nil, err
 }

	video := model.Video{
		Title: ytData.Title,
		Description: ytData.Title,
		ThumbnailURL: ytData.ThumbnailUrl,
		SourceURL: videoUrl,
		YoutubeId: youtubeId,
		UserId: user.Id,
		Likes: datatypes.JSONSlice[int]{},
		Dislikes: datatypes.JSONSlice[int]{},
	}

	createdId, err := vs.VideoRepo.Save(video)
	if err != nil {
		return nil, err
	}
	video.Id = createdId

	vs.UserRepo.Associate(*user, video)

	responseVideo := &response.Video{
		Id: video.Id,
		Title: video.Title,
		Description: video.Description,
		ThumbnailURL: video.ThumbnailURL,
		SourceURL: video.SourceURL,
		YoutubeId: video.YoutubeId,
		Likes: video.Likes,
		Dislikes: video.Dislikes,
		SharedBy: username,
	}

	return responseVideo, nil
}

func (vs *VideoServiceImpl) Prefer(username string, videoId int, liked bool) (datatypes.JSONSlice[int], datatypes.JSONSlice[int], error) {
	user, err := vs.UserRepo.FindByUsername(username)
	if err != nil {
		return nil, nil, err
	}

	video, err := vs.VideoRepo.FindById(videoId)
	if err != nil {
		return nil, nil, err
	}

	if liked {
		// user clicked the like button
		uIndex := helper.Index(video.Likes, user.Id)
		if uIndex > -1 {
			// this means user already liked this video
			// we will delete userId from the Likes slice
			video.Likes = append(video.Likes[:uIndex], video.Likes[uIndex + 1:]...)
		} else {
			// user haven't liked the video
			// we will update the Likes slice
			video.Likes = append(video.Likes, user.Id)
		}

		// also need to remove from Dislikes slice 
		// if user likes the video
		uIndex = helper.Index(video.Dislikes, user.Id)
		if uIndex > -1 {
			video.Dislikes = append(video.Dislikes[:uIndex], video.Dislikes[uIndex + 1:]...)
		}
	} else {
		// user clicked the dislike button
		uIndex := helper.Index(video.Dislikes, user.Id)
		if uIndex > -1 {
			// this means user already disliked this video
			// we will delete userId from the Dislikes slice
			video.Dislikes = append(video.Dislikes[:uIndex], video.Dislikes[uIndex + 1:]...)
		} else {
			// user haven't disliked the video
			// we will update the Dislikes slice
			video.Dislikes = append(video.Dislikes, user.Id)
		}

		// also need to remove from Likes slice 
		// if user dislikes the video
		uIndex = helper.Index(video.Likes, user.Id)
		if uIndex > -1 {
			video.Likes = append(video.Likes[:uIndex], video.Likes[uIndex + 1:]...)
		}
	}

	// finally we update video record
	vs.VideoRepo.Update(video)

	return video.Likes, video.Dislikes, nil
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
			YoutubeId: value.YoutubeId,
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
		YoutubeId: result.YoutubeId,
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

func (vs *VideoServiceImpl) handleYoutubeUrl(url string) (string, string) {
	// https://www.youtube.com/watch?v=QY2Sj7-MMgM&theme=1
	// https://youtu.be/QY2Sj7-MMgM
	
	parsedUrl := ""
	youtubeId := ""
	urlParts := strings.Split(url, "://")

	if len(urlParts) == 1 {
		parsedUrl = urlParts[0]
		} else {
		parsedUrl = urlParts[1]
	}

	urlParts = strings.Split(parsedUrl, "/")
	if urlParts[0] == "youtu.be" {
		youtubeId = urlParts[1]
	} else {
		query := strings.Split(urlParts[1], "?")
		queryParts := strings.Split(query[1], "&")

		for _, part := range queryParts {
			parts := strings.Split(part, "=")
			if parts[0] == "v" {
				youtubeId = parts[1]
				break;
			}
		}
	}

	return parsedUrl, youtubeId
}
