package helper

import (
	"fmt"
	"log"
	"os"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
)

type SignedDetails struct {
	Username	string
	jwt.StandardClaims
}

var SECRET_KEY string = os.Getenv("SECRET_KEY")
 
func GenerateAllTokens(username string) (signedToken string, signedRefreshToken string, err error) {
    claims := &SignedDetails{
        Username:	username,
        StandardClaims: jwt.StandardClaims{
            ExpiresAt: time.Now().Local().Add(time.Hour * time.Duration(24)).Unix(),
        },
    }
 
    refreshClaims := &SignedDetails{
        StandardClaims: jwt.StandardClaims{
            ExpiresAt: time.Now().Local().Add(time.Hour * time.Duration(168)).Unix(),
        },
    }
 
    token, err := jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString([]byte(SECRET_KEY))
    refreshToken, err := jwt.NewWithClaims(jwt.SigningMethodHS256, refreshClaims).SignedString([]byte(SECRET_KEY))
 
    if err != nil {
        log.Panic(err)
        return
    }
 
    return token, refreshToken, err
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

// func UpdateAllTokens(signedToken string, signedRefreshToken string, userId string) {
// 	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)

// 	var updateObj primitive.D

// 	updateObj = append(updateObj, bson.E{Key: "token", Value: signedToken})
// 	updateObj = append(updateObj, bson.E{Key: "refresh_token", Value: signedRefreshToken})

// 	Updated_at, _ := time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))
// 	updateObj = append(updateObj, bson.E{Key: "updated_at", Value: Updated_at})

// 	upsert := true
// 	filter := bson.M{"user_id": userId}
// 	opt := options.UpdateOptions{
// 			Upsert: &upsert,
// 	}

// 	_, err := userCollection.UpdateOne(
// 			ctx,
// 			filter,
// 			bson.D{
// 					{Key: "$set", Value: updateObj},
// 			},
// 			&opt,
// 	)

// 	defer cancel()

// 	if err != nil {
// 			log.Panic(err)
// 			return
// 	}
// 	return
// }