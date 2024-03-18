package repository

import (
	"errors"

	"github.com/trungnd3/remitano-videos/data/request"
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
	var updateUser = request.UpdateUser{
		Id: user.Id,
		Token: user.Token,
		RefreshToken: user.RefreshToken,
	}
	result := u.Db.Model(&user).Updates(updateUser)
	helper.ErrorPanic(result.Error)
}

// Associate implements UserRepo.
func (u *UserRepoImpl) Associate(user model.User, video model.Video) {
	err := u.Db.Model(&user).Association("Videos").Append(&video)
	helper.ErrorPanic(err)
	u.Db.Save(&user)
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
func (u *UserRepoImpl) FindByUsername(username string) (*model.User, error) {
	user := &model.User{}
	u.Db.Where(&model.User{Username: username}).First(&user)
	if user.Id > 0 {
		return user, nil
	}
	return user, errors.New("User not found")
}

// Delete implements UserRepo.
func (u *UserRepoImpl) Delete(userId int) {
	var user model.User
	result := u.Db.Where("id = ?", userId).Delete(&user)
	helper.ErrorPanic(result.Error)
}
