package server

import (
	"github.com/golang-jwt/jwt/v5"
	"crypto/rsa"
	"crypto/x509"
	"encoding/pem"
	"github.com/joho/godotenv"
	_ "github.com/joho/godotenv/autoload"
	"log"
	"os"
)

func ExtractUserIdFromJWT(jwttoken string) int {
	err := godotenv.Load()
	if err != nil {
	  log.Fatal("Error loading .env file")
	  return -1
	}
	JWT_PUBLIC_KEY:=os.Getenv("JWT_PUBLIC_KEY")

	block, _ := pem.Decode([]byte(JWT_PUBLIC_KEY))
	if block == nil || block.Type != "PUBLIC KEY" {
		log.Fatal("Failed to decode PEM block containing public key")
		return -1
	}

	// Parse the RSA public key
	pub, err := x509.ParsePKIXPublicKey(block.Bytes)
	if err != nil {
		log.Fatal("Failed to parse public key: ", err)
		return -1
	}

	rsaPubKey, ok := pub.(*rsa.PublicKey)
	if !ok {
		log.Fatal("Key is not of type *rsa.PublicKey")
		return -1
	}

	claims := jwt.MapClaims{}
	_, err = jwt.ParseWithClaims(jwttoken, claims, func(token *jwt.Token) (interface{}, error) {
		return rsaPubKey, nil
	})
	// ... error handling
	if err != nil {
		log.Fatal(err)
		return -1
	}
	// Type assertion to extract the value as a float64, then convert to int
	if userid, ok := claims["userid"].(float64); ok {
		return int(userid)
	} else {
		log.Fatal("userid claim is not a valid number")
		return -1;
	}
}