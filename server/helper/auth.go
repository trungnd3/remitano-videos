package helper

import (
	"fmt"
	"os"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/rs/zerolog/log"
)

type SignedDetails struct {
	Username	string
	jwt.StandardClaims
}

var SECRET_KEY string = os.Getenv("SECRET_KEY")
// Token expires in 30 minutes
var TOKEN_EXPIRED_IN int = 30 * 60
// Refres token expires in 24 hours
var REFRESH_TOKEN_EXPIRED_IN int = 24 * 60 * 60
 
func GenerateAllTokens(username string) (string, int64, string, error) {
	tokenExpiresAt := time.Now().Local().Add(time.Second * time.Duration(TOKEN_EXPIRED_IN)).UnixMilli()

	claims := &SignedDetails{
			Username:	username,
			StandardClaims: jwt.StandardClaims{
					ExpiresAt: tokenExpiresAt,
			},
	}

	refreshClaims := &SignedDetails{
			StandardClaims: jwt.StandardClaims{
					ExpiresAt: time.Now().Local().Add(time.Second * time.Duration(REFRESH_TOKEN_EXPIRED_IN)).UnixMilli(),
			},
	}

	token, err := jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString([]byte(SECRET_KEY))
	refreshToken, err := jwt.NewWithClaims(jwt.SigningMethodHS256, refreshClaims).SignedString([]byte(SECRET_KEY))

	if err != nil {
			log.Error().Msg(err.Error())
			return "", 0, "", err
	}


	return token, tokenExpiresAt, refreshToken, err
}

func ValidateToken(signedToken string) (claims *SignedDetails, msg string) {
	token, err := jwt.ParseWithClaims(
		signedToken,
		&SignedDetails{},
		func(token *jwt.Token) (interface{}, error) {
				return []byte(SECRET_KEY), nil
		},
	)

	if err != nil {
			msg = err.Error()
			return
	}

	claims, ok := token.Claims.(*SignedDetails)
	if !ok {
			msg = fmt.Sprintf("the token is invalid")
			msg = err.Error()
			return
	}

	if claims.ExpiresAt < time.Now().Local().Unix() {
			msg = fmt.Sprintf("token is expired")
			msg = err.Error()
			return
	}

	return claims, msg
}
