package router

import (
	"net/http"

	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"github.com/trungnd3/remitano-videos/controller"
)

func NewRouter(userController *controller.UserController) *gin.Engine {
	router := gin.Default()

	// add swagger
	router.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	router.GET("/", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, "Hi there\n")
	})

	userRouter := router.Group("/users")
	userRouter.GET("/:userId", userController.FindById)
	userRouter.POST("", userController.Create)
	userRouter.DELETE("/:userId", userController.Delete)

	return router
}