package model

import "gorm.io/gorm"

type Video struct {
	gorm.Model
	Id						int			`gorm:"type:int,primary_key"`
	Title					string	`gorm:"type:varchar(255)"`
	Description		string	`gorm:"type:text"`
	ThumbnailURL	string	`gorm:"type:varchar(255)"`
	SourceURL			string	`gorm:"type:varchar(255)"`
	Likes					int			`gorm:"type:int"`
	Dislikes			int			`gorm:"type:int"`
	UserId				int			`gorm:"type:int"`
}