package utils

import (
	"fmt"
	"time"

	"github.com/golang-jwt/jwt"
)

func GenerateJWT(userID string) (string, string, error) {
	accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"exp": time.Now().Add(time.Minute * 15).Unix(),
		"sub": userID,
	})

	refreshToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"exp": time.Now().Add(time.Hour * 24 * 7).Unix(),
	})

	signedAccessToken, err := accessToken.SignedString([]byte("access-secret"))
	if err != nil {
		return "", "", err
	}

	signedRefreshToken, err := refreshToken.SignedString([]byte("refresh-secret"))
	if err != nil {
		return "", "", err
	}

	return signedAccessToken, signedRefreshToken, nil
}

func GetUserIDFromJWT(token string) (string, error) {
	decoded, err := jwt.Parse(token, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", t.Header["alg"])
		}
		return []byte("access-secret"), nil
	})
	if err != nil {
		return "", err
	}

	if claims, ok := decoded.Claims.(jwt.MapClaims); ok && decoded.Valid {
		return claims["sub"].(string), nil
	}
	return "", fmt.Errorf("invalid token")
}
