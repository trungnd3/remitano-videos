package model

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Id						int				`gorm:"type:int,primary_key"`
	Username			string		`gorm:"type:varchar(255)"`
	Password			string		`gorm:"type:varchar(255)"`
	Token					string		`gorm:"type:text"`
	RefreshToken	string		`gorm:"type:text"`
	Videos				[]Video
}