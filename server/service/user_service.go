package service

import (
	"github.com/trungnd3/remitano-videos/data/request"
	"github.com/trungnd3/remitano-videos/data/response"
)

type UserService interface {
	Create(user request.CreateUserRequest) error
	SignIn(user request.CreateUserRequest) (string, error)
	Update(user request.UpdateUserRequest)
	Delete(userId int)
	FindById(userId int) response.UserResponse
	FindAll() []response.UserResponse
}