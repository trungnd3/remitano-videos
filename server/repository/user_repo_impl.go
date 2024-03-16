package repository

import (
	"errors"

	"github.com/trungnd3/remitano-videos/helper"
	"github.com/trungnd3/remitano-videos/model"
	"gorm.io/gorm"
)

type UserRepoImpl struct {
	Db *gorm.DB
}

func NewUserRepoImpl(Db *gorm.DB) UserRepo {
	return &UserRepoImpl{Db: Db}
}

// Save implements UserRepo.
func (u *UserRepoImpl) Save(user model.User) {
	result := u.Db.Create(&user)
	helper.ErrorPanic(result.Error)
}

// Update implements UserRepo.
func (u *UserRepoImpl) Update(user model.User) {
	panic("unimplemented")

	// var updateUser = request.UpdateUser{
	// 	Id: user.Id,
	// }
	// result := u.Db.Model(&user).Updates(updateUser)
	// helper.ErrorPanic(result.Error)
}

// FindAll implements UserRepo.
func (u *UserRepoImpl) FindAll() []model.User {
	var users []model.User
	result := u.Db.Find(&users)
	helper.ErrorPanic(result.Error)
	return users
}

// FindById implements UserRepo.
func (u *UserRepoImpl) FindById(userId int) (model.User, error) {
	var user model.User
	result := u.Db.Find(&user, userId)
	if result != nil {
		return user, nil
	} else {
		return user, errors.New("User not found")
	}
}

// FindByUsername implements UserRepo.
func (u *UserRepoImpl) FindByUsername(username string) (model.User, error) {
	var user model.User
	result := u.Db.Find(&user, model.User{
		Username: username,
	})
	if result != nil {
		return user, nil
	} else {
		return user, errors.New("User not found")
	}
}

// Delete implements UserRepo.
func (u *UserRepoImpl) Delete(userId int) {
	var user model.User
	result := u.Db.Where("id = ?", userId).Delete(&user)
	helper.ErrorPanic(result.Error)
}
