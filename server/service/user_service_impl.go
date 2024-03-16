package service

import (
	"errors"

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
func (us *UserServiceImpl) Create(user request.CreateUser) error {
	err := us.Validate.Struct(user)
	helper.ErrorPanic(err)

	userData, err := us.UserRepo.FindByUsername(user.Username)
	helper.ErrorPanic(err)
	if (userData != model.User{}) {
		return errors.New("User already exists.")
	}

	userModel := model.User{
		Username: user.Username,
		Password: user.Password,
	}
	us.UserRepo.Save(userModel)
	return nil
}

func (us *UserServiceImpl) SignIn(user request.CreateUser) (string, error) {
	userData, err := us.UserRepo.FindByUsername(user.Username)
	helper.ErrorPanic(err)

	if (userData == model.User{}) {
		return "", errors.New("User does not exist.")
	}

	// TODO: check with bcrypt algorithm
	if (userData.Password != user.Password) {
		return "", errors.New("Invalid credentials.")
	}

	return userData.Username, nil
}

// Delete implements UserService.
func (us *UserServiceImpl) Delete(userId int) {
	us.UserRepo.Delete(userId)
}

// FindAll implements UserService.
func (us *UserServiceImpl) FindAll() []response.User {
	result := us.UserRepo.FindAll()

	var users []response.User
	for _, value := range result {
		user := response.User{
			Id: value.Id,
			Username: value.Username,
		}
		users = append(users, user)
	}

	return users
}

// FindById implements UserService.
func (us *UserServiceImpl) FindById(userId int) response.User {
	userData, err := us.UserRepo.FindById(userId)
	helper.ErrorPanic(err)
	user := response.User{
		Id: userData.Id,
		Username: userData.Username,
	}
	return user
}

// Update implements UserService.
func (us *UserServiceImpl) Update(user request.UpdateUser) {
	userData, err := us.UserRepo.FindById(user.Id)
	helper.ErrorPanic(err)
	us.UserRepo.Update(userData)
}
