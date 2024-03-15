package service

import (
	"github.com/go-playground/validator/v10"
	"github.com/trungnd3/remitano-videos/data/request"
	"github.com/trungnd3/remitano-videos/data/response"
	"github.com/trungnd3/remitano-videos/helper"
	"github.com/trungnd3/remitano-videos/model"
	"github.com/trungnd3/remitano-videos/repository"
)

type UserServiceImpl struct {
	UserRepo repository.UserRepo
	Validate *validator.Validate
}

func NewUserServiceImpl(userRepo repository.UserRepo, validate *validator.Validate) UserService {
	return &UserServiceImpl{
		UserRepo: userRepo,
		Validate: validate,
	}
}

// Create implements UserService.
func (us *UserServiceImpl) Create(user request.CreateUserRequest) {
	err := us.Validate.Struct(user)
	helper.ErrorPanic(err)
	userModel := model.User{
		Username: user.Username,
		Password: user.Password,
	}
	us.UserRepo.Save(userModel)
}

// Delete implements UserService.
func (us *UserServiceImpl) Delete(userId int) {
	us.UserRepo.Delete(userId)
}

// FindAll implements UserService.
func (us *UserServiceImpl) FindAll() []response.UserResponse {
	result := us.UserRepo.FindAll()

	var users []response.UserResponse
	for _, value := range result {
		user := response.UserResponse{
			Id: value.Id,
			Username: value.Username,
		}
		users = append(users, user)
	}

	return users
}

// FindById implements UserService.
func (us *UserServiceImpl) FindById(userId int) response.UserResponse {
	userData, err := us.UserRepo.FindById(userId)
	helper.ErrorPanic(err)
	user := response.UserResponse{
		Id: userData.Id,
		Username: userData.Username,
	}
	return user
}

// Update implements UserService.
func (us *UserServiceImpl) Update(user request.UpdateUserRequest) {
	userData, err := us.UserRepo.FindById(user.Id)
	helper.ErrorPanic(err)
	us.UserRepo.Update(userData)
}
