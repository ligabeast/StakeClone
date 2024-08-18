package db

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"encoding/json"
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

func StoreInitialRouletteGame() int {
	if stakeDb == nil {
		log.Fatal("Stake DB not initialized")
		return 0;
	}

	results, err := stakeDb.Exec("INSERT INTO Stake.RouletteGames (status,room) values ('running',1);");
	if err != nil {
		log.Fatal(err)
		return 0;
	}
	fmt.Println("Stored initial roulette game")
	id,err := results.LastInsertId()
	if err != nil {
		log.Fatal("No id returned");
		return 0;
	}
	fmt.Println("Initial id:", id)
	return int(id);
}

func StoreDrawnRouletteGame(winningNumber int, id int) {
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

	_, err := stakeDb.Exec("Update Stake.RouletteGames SET winningNumber=?,winningColor=?,winningSection=?,isOdd=?,status='completed' where id = ?", winningNumber, winningColor, winningSection, isOdd, id)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Stored drawn roulette game", id)

	rows, err := stakeDb.Query("SELECT b.userId as userid, rbs.numberBets as numberBets, rbs.additionalBets as additionalBets from Stake.RouletteGames roga JOIN Stake.RouletteBets rbs ON rbs.rouletteGameId = roga.id JOIN Stake.Bets b On b.referenceId = rbs.id where roga.id = ?", id)

	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	for rows.Next() {
		var userId int
		var numberBets string
		var additionalBets string

		err := rows.Scan(&userId, &numberBets, &additionalBets)
		if err != nil {
			log.Fatal(err)
		}

		var numberBetsSlice []int
		var additionalBetsSLice []int

		fmt.Println(numberBets)
		err = json.Unmarshal([]byte(numberBets), &numberBetsSlice)
		if err != nil {
			log.Fatal(err)
		}
		err = json.Unmarshal([]byte(additionalBets), &additionalBetsSLice)
		if err != nil {
			log.Fatal(err)
		}

		profit := calculateProfit(winningNumber, numberBetsSlice, additionalBetsSLice);

		if(profit == 0){
			fmt.Println("User with id: ", userId ," Lost")
			return;
		}
		fmt.Println("User with id: ", userId ," Won: ", profit)
		_, err = stakeDb.Exec("Update Stake.Users set deposit = deposit + ? where id = ?", profit, userId)
		if err != nil {
			log.Fatal(err)
		}

	}
}

func calculateProfit(winningNumber int, numberBets []int, additionalBets []int) int {
    var profit int

    // Payout ratio for straight-up bets
    const straightUpPayout = 36

    // Process number bets (straight-up bets)
    for i, v := range numberBets {
        if v > 0 && winningNumber == v {
            profit += straightUpPayout * numberBets[i]
        }
    }

    for i, v := range additionalBets {
        if v > 0 {
            switch i {
            case 0: // 1-12
                if winningNumber >= 1 && winningNumber <= 12 {
                    profit += 3 * additionalBets[i]
                }
            case 1: // 13-24
                if winningNumber >= 13 && winningNumber <= 24 {
                    profit += 3 * additionalBets[i]
                }
            case 2: // 25-36
                if winningNumber >= 25 && winningNumber <= 36 {
                    profit += 3 * additionalBets[i]
                }
            case 3: // 1-18 
                if winningNumber >= 1 && winningNumber <= 18 {
                    profit += 2 * additionalBets[i]
                }
            case 4: // Even
                if winningNumber%2 == 0 && winningNumber != 0 {
                    profit += 2 * additionalBets[i]
                }
            case 5: // Red
                if winningNumber >= 1 && winningNumber <= 10 {
                    profit += 2 * additionalBets[i]
                }
            case 6: // Black
                if winningNumber >= 11 && winningNumber <= 20 {
                    profit += 2 * additionalBets[i]
				}
            case 7: // Odd
                if winningNumber%2 != 0 {
                    profit += 2 * additionalBets[i]
                }
            case 8: // 19-36
                if winningNumber >= 19 && winningNumber <= 36 {
                    profit += 2 * additionalBets[i]
                }
            }
        }
    }

    return profit
}

func CloseStakeDB() {
    err := stakeDb.Close()
    if err != nil {
        log.Fatal(err)
    }
}
