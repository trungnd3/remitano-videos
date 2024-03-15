package config

import (
	"fmt"
	"os"

	"github.com/trungnd3/remitano-videos/helper"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func DBConn() *gorm.DB {

	sqlInfo := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		os.Getenv("PGHOST"),
		os.Getenv("PGPORT"),
		os.Getenv("PGUSER"),
		os.Getenv("PGPASSWORD"),
		os.Getenv("PGDATABASE"),
	)

	db, err := gorm.Open(postgres.Open(sqlInfo), &gorm.Config{})
	helper.ErrorPanic(err)

	return db
}