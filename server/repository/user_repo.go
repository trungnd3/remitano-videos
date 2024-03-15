package repository

import "github.com/trungnd3/remitano-videos/model"

type UserRepo interface {
	Save(user model.User)
	Update(user model.User)
	Delete(userId int)
	FindById(userId int) (user model.User, err error)
	FindByUsername(username string) (user model.User, err error)
	FindAll() []model.User
}