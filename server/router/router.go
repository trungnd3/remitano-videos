package router

import (
	"net/http"

	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"github.com/trungnd3/remitano-videos/controller"
	"github.com/trungnd3/remitano-videos/middleware"
)

func NewRouter(
	userController *controller.UserController,
	videoController *controller.VideoController,
) *gin.Engine {
	router := gin.Default()

	// add swagger
	router.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	router.GET("/", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, "Hi there\n")
	})

	userRouter := router.Group("/users")
	userRouter.GET("", userController.FindAll)
	userRouter.GET("/:userId", userController.FindById)
	userRouter.POST("", userController.Create)
	userRouter.POST("/signin", userController.SignIn)
	userRouter.DELETE("/:userId", userController.Delete)

	videosGroup := router.Group("/videos")
	videosGroup.Use(middleware.Authenticate)
	videosGroup.GET("", videoController.FindAll)
	// videosGroup.GET("/:userId", videoController.FindById)
	videosGroup.POST("", videoController.Share)
	// videosGroup.DELETE("/:userId", videoController.Delete)

	return router
}