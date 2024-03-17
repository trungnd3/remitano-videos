package middleware

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/trungnd3/remitano-videos/helper"
)

func Authenticate(ctx *gin.Context) {
	authorization := ctx.Request.Header.Get("Authorization")
	tokens := strings.Split(authorization, " ")
	clientToken := tokens[1]
	if clientToken == "" || tokens[0] != "Bearer" {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("No Authorization Header Provided")})
			ctx.Abort()
			return
	}

	claims, err := helper.ValidateToken(clientToken)
	if err != "" {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err})
			ctx.Abort()
			return
	}
	// ctx.Set("first_name", claims.First_name)
	// ctx.Set("last_name", claims.Last_name)
	// ctx.Set("uid", claims.Uid)
	// log.Info().Msg(claims.Username)
	ctx.Set("username", claims.Username)
	ctx.Next()
}