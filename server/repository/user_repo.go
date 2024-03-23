package repository

import "github.com/trungnd3/remitano-videos/model"

type UserRepo interface {
	Save(user model.User) (int, error)
	Update(user model.User)
	Associate(user model.User, video model.Video)
	Delete(userId int)
	FindById(userId int) (*model.User, error)
	FindByUsername(username string) (*model.User, error)
	FindAll() []model.User
}