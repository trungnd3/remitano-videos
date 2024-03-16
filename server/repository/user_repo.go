package repository

import "github.com/trungnd3/remitano-videos/model"

type UserRepo interface {
	Save(user model.User)
	Update(user model.User)
	Delete(userId int)
	FindById(userId int) (model.User, error)
	FindByUsername(username string) (model.User, error)
	FindAll() []model.User
}