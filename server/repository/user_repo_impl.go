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

	// var updateUser = request.UpdateUserRequest{
	// 	Id: user.Id,
	// }
	// result := u.Db.Model(&user).Updates(updateUser)
	// helper.ErrorPanic(result.Error)
}

// FindAll implements UserRepo.
func (u *UserRepoImpl) FindAll() []model.User {
	var usrs []model.User
	result := u.Db.Find(&usrs)
	helper.ErrorPanic(result.Error)
	return usrs
}

// FindById implements UserRepo.
func (u *UserRepoImpl) FindById(userId int) (user model.User, err error) {
	var usr model.User
	result := u.Db.Find(&usr, userId)
	if result != nil {
		return usr, nil
	} else {
		return usr, errors.New("User not found")
	}
}

// Delete implements UserRepo.
func (u *UserRepoImpl) Delete(userId int) {
	var usr model.User
	result := u.Db.Where("id = ?", userId).Delete(&usr)
	helper.ErrorPanic(result.Error)
}
