package service

import (
	"github.com/trungnd3/remitano-videos/data/request"
	"github.com/trungnd3/remitano-videos/data/response"
)

type UserService interface {
	Create(user request.CreateUser) error
	SignIn(user request.CreateUser) (string, error)
	Update(user request.UpdateUser)
	Delete(userId int)
	FindById(userId int) response.User
	FindAll() []response.User
	HashPassword(password string) string
	VerifyPassword(userPassword string, provicedPassword string) (bool, string)
}