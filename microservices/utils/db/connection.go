package db

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
	_ "github.com/joho/godotenv/autoload"
)

var stakeDb *sql.DB

func InitStakeDBConnection() {

	if stakeDb != nil {
		log.Fatal("Stake DB already initialized")
		return;	
	}

	dsn := getStakeDBdsn()
	db, err := sql.Open("mysql", dsn)

	if err != nil {
		log.Fatal(err)
	}
	if err := db.Ping(); err != nil {
		log.Fatal(err)
	}
	stakeDb = db	
	fmt.Println("Connected to Stake DB")
}

func getStakeDBdsn() string {
	err := godotenv.Load()
	if err != nil {
	  log.Fatal("Error loading .env file")
	}
	DB_NAME:=os.Getenv("DB_NAME")
	DB_USER:=os.Getenv("DB_USER")
	DB_PASSWORD:=os.Getenv("DB_PASSWORD")
	DB_HOST:=os.Getenv("DB_HOST")
	DB_PORT:=os.Getenv("DB_PORT")
	dsn := DB_USER + ":" + DB_PASSWORD + "@tcp(" + DB_HOST + ":" + DB_PORT + ")/" + DB_NAME + "?charset=utf8&parseTime=True&loc=Local"
	return dsn
}

func StoreDrawnRouletteGame(winningNumber int) {
	if stakeDb == nil {
		log.Fatal("Stake DB not initialized")
		return;
	}
	isOdd := winningNumber % 2 != 0
	winningColor := "red"
	if winningNumber == 0 {
		winningColor = "green"
	} else if winningNumber > 0 && winningNumber < 11 {
		if winningNumber % 2 == 0 {
			winningColor = "black"
		}
	} else if winningNumber > 10 && winningNumber < 19 {
		if winningNumber % 2 != 0 {
			winningColor = "black"
		}
	} else if winningNumber > 18 && winningNumber < 29 {
		if winningNumber % 2 == 0 {
			winningColor = "black"
		}
	} else if winningNumber > 28 && winningNumber < 37 {
		if winningNumber % 2 != 0 {
			winningColor = "black"
		}
	}
	winningSection := "1-12"
	if winningNumber > 12 && winningNumber < 25 {
		winningSection = "13-24"
	} else if winningNumber > 24 {
		winningSection = "25-36"
	}

	_, err := stakeDb.Exec("INSERT INTO Stake.RoulleteGames (winningNumber, winningColor, winningSection, isOdd) values (?,?,?,?);", winningNumber, winningColor, winningSection, isOdd)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Stored drawn roulette game")
}

func CloseStakeDB() {
    err := stakeDb.Close()
    if err != nil {
        log.Fatal(err)
    }
}
