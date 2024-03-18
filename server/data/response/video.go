package response

import (
	"gorm.io/datatypes"
)

type Video struct {
	Id						int			`json:"id"`
	Title					string	`json:"title"`
	Description		string	`json:"description"`
	ThumbnailURL	string	`json:"thumbnailUrl"`
	SourceURL			string	`json:"sourceUrl"`
	YoutubeId			string	`json:"youtubeId"`
	Likes					datatypes.JSONSlice[int]		`json:"likes"`
	Dislikes			datatypes.JSONSlice[int]		`json:"dislikes"`
	SharedBy			string	`json:"sharedBy"`
}

type PreferVideo struct {
	Likes					datatypes.JSONSlice[int]		`json:"likes"`
	Dislikes			datatypes.JSONSlice[int]		`json:"dislikes"`
}