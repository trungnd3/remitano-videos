package model

import (
	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type UserLts []int

type Video struct {
	gorm.Model
	Id						int			`gorm:"type:int,primary_key"`
	Title					string	`gorm:"type:varchar(255)"`
	Description		string	`gorm:"type:text"`
	ThumbnailURL	string	`gorm:"type:varchar(255)"`
	SourceURL			string	`gorm:"type:varchar(255)"`
	YoutubeId			string	`gorm:"type:varchar(100)"`
	Likes					datatypes.JSONSlice[int]
	Dislikes			datatypes.JSONSlice[int]
	UserId				int			`gorm:"type:int"`
}
