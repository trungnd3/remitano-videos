package repository

import (
	"context"
	"errors"
	"time"

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
func (u *UserRepoImpl) Save(user model.User) (int, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	result := u.Db.WithContext(ctx).Create(&user)
	return user.Id, result.Error
}

// Update implements UserRepo.
func (u *UserRepoImpl) Update(user model.User) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var updateUser = request.UpdateUser{
		Id: user.Id,
		Token: user.Token,
		RefreshToken: user.RefreshToken,
	}
	result := u.Db.WithContext(ctx).Model(&user).Updates(updateUser)
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
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var users []model.User
	result := u.Db.WithContext(ctx).Find(&users)
	helper.ErrorPanic(result.Error)
	return users
}

// FindById implements UserRepo.
func (u *UserRepoImpl) FindById(userId int) (*model.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var user = &model.User{}
	u.Db.WithContext(ctx).Find(&user, userId)
	if user.Id > 0 {
		return user, nil
	}
	return nil, errors.New("User not found")
}

// FindByUsername implements UserRepo.
func (u *UserRepoImpl) FindByUsername(username string) (*model.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var user = &model.User{}
	u.Db.WithContext(ctx).Where(&model.User{Username: username}).First(&user)
	if user.Id > 0 {
		return user, nil
	}
	return nil, errors.New("User not found")
}

// Delete implements UserRepo.
func (u *UserRepoImpl) Delete(userId int) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var user model.User
	result := u.Db.WithContext(ctx).Where("id = ?", userId).Delete(&user)
	helper.ErrorPanic(result.Error)
}
