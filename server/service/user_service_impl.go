package service

import (
	"errors"
	"fmt"

	"github.com/go-playground/validator/v10"
	"github.com/rs/zerolog/log"
	"github.com/trungnd3/remitano-videos/data/request"
	"github.com/trungnd3/remitano-videos/data/response"
	"github.com/trungnd3/remitano-videos/helper"
	"github.com/trungnd3/remitano-videos/model"
	"github.com/trungnd3/remitano-videos/repository"
	"golang.org/x/crypto/bcrypt"
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
func (us *UserServiceImpl) Create(user request.CreateUser) (int, string, error) {
	err := us.Validate.Struct(user)
	if err != nil {
		log.Info().Msgf("Error: %s\n", err.Error())
		return 0, "", err
	}

	userData, err := us.UserRepo.FindByUsername(user.Username)
	if (userData != nil) {
		return 0, "", errors.New("User already exists.")
	}

	password := us.HashPassword(user.Password)
	user.Password = password

	token, refreshToken, _ := helper.GenerateAllTokens(user.Username)

	userModel := model.User{
		Username: user.Username,
		Password: user.Password,
		Token: 		token,
		RefreshToken: refreshToken,
	}
	createdId, err := us.UserRepo.Save(userModel)
	return createdId, token, err
}

func (us *UserServiceImpl) SignIn(user request.CreateUser) (int, string, error) {
	userData, err := us.UserRepo.FindByUsername(user.Username)

	if (err != nil || userData == nil) {
		return 0, "", errors.New("User does not exist")
	}

	passwordIsValid, msg := us.VerifyPassword(user.Password, userData.Password)
	if passwordIsValid != true {
		return 0, "", errors.New(msg)
	}

	token, refreshToken, _ := helper.GenerateAllTokens(user.Username)
	updateUser := &model.User{
		Id: userData.Id,
		Token: token,
		RefreshToken: refreshToken,
	}
	us.UserRepo.Update(*updateUser)

	return userData.Id, token, nil
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
			Token: value.Token,
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
		Token: userData.Token,
	}
	return user
}

// Update implements UserService.
func (us *UserServiceImpl) Update(user request.UpdateUser) {
	userData, err := us.UserRepo.FindById(user.Id)
	helper.ErrorPanic(err)
	us.UserRepo.Update(userData)
}

func (us *UserServiceImpl) HashPassword(password string) string {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	helper.ErrorPanic(err)
	return string(bytes)
}

func (us *UserServiceImpl) VerifyPassword(userPassword string, providedPassword string) (bool, string) {
	err := bcrypt.CompareHashAndPassword([]byte(providedPassword), []byte(userPassword))
	check := true
	msg := ""

	if err != nil {
		msg = fmt.Sprintf("Username or Password incorrect")
		check  = false
	}
	
	return check, msg
}
