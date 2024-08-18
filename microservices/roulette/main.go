package main

import (
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"strconv"

	"math/big"

	"github.com/gorilla/websocket"
	"github.com/ligabeast/StakeClone/microservices/utils/db"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

var countdown int = 30
var gamePlaying bool = false
var gameDrawn bool = false
var clients = make(map[*websocket.Conn]bool) // Store active connections
var last100Numbers []int

func reader(conn *websocket.Conn) {
	defer func() {
		conn.Close()
		delete(clients, conn) // Remove client on disconnect
	}()
	for {
		_, _, err := conn.ReadMessage()
		if err != nil {
			log.Println("Client disconnected:", err)
			return
		}
	}
}

func broadcaster() {
	for {
		if gamePlaying {
			convertedString := strconv.Itoa(countdown)
			data := map[string]string{
				"action": "countdown",
				"countdown": convertedString,
			}
			jsonData, _ := getJson(data)

			for conn := range clients {
				if err := conn.WriteMessage(websocket.TextMessage, jsonData); err != nil {
					log.Println("Error writing to client:", err)
					conn.Close()
					delete(clients, conn)
				}
			}
		}
		if !gamePlaying && gameDrawn {
			data := map[string]interface{}{
				"action" : "drawn" , 
				"winningNumber": strconv.Itoa(last100Numbers[0]),
				"last100Numbers":  last100Numbers,
			}
			jsonData, _ := getJson(data)

			for conn := range clients {
				if err := conn.WriteMessage(websocket.TextMessage, jsonData); err != nil {
					log.Println("Error writing to client:", err)
					conn.Close()
					delete(clients, conn)
				}
			}
			gameDrawn = false
		}
		time.Sleep(1 * time.Second) // Send every second
	}
}

func wsRoulette(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	clients[ws] = true // Add new connection to clients map
	log.Println("Client Connected")
	go reader(ws)
}

func setupRoutes() {
	http.HandleFunc("/roulette", wsRoulette)
}

func main() {
	db.InitStakeDBConnection()
	go rouletteGame()
	go broadcaster() // Start broadcasting in a separate goroutine
	setupRoutes()
	fmt.Println("Websocket starting at :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func prependAndLimit(slice []int, element int, limit int) []int {
	// Prepend the new element by creating a new slice
	slice = append([]int{element}, slice...)

	// Limit the slice to the specified number of elements
	if len(slice) > limit {
		slice = slice[:limit]
	}

	return slice
}

func rouletteGame() {
	for {
		fmt.Println("Starting countdown...")
		gamePlaying = true
		insertedId := db.StoreInitialRouletteGame()
		for countdown = 30; countdown >= 0; countdown-- {
			fmt.Println(countdown)
			time.Sleep(1 * time.Second)
		}
		gamePlaying = false
		countdown = 30
		winningNumber, err := drawRouletteRound()
		if err != nil {
			fmt.Println("Error drawing roulette round:", err)
			continue
		}
		fmt.Println("Winning number:", winningNumber)
		
		fmt.Println("Last 100 numbers:", last100Numbers)
		last100Numbers = prependAndLimit(last100Numbers, winningNumber, 100)
		fmt.Println("Last 100 numbers:", last100Numbers)

		db.StoreDrawnRouletteGame(winningNumber,insertedId)

		gameDrawn = true
		fmt.Println("Waiting 5 seconds before starting again...")
		time.Sleep(5 * time.Second)
		gameDrawn = false
	}
}

type LCG struct {
	state uint64
}

const (
	a = 1664525
	c = 1013904223
	m = 1 << 32 // 2^32
)

func NewLCG(seed string) (*LCG, error) {
	// Convert the seed from hexadecimal string to a number
	seedBigInt, success := new(big.Int).SetString(seed, 16)
	if !success {
		return nil, fmt.Errorf("invalid seed format")
	}

	// Ensure seed fits in uint32
	seedUint64 := seedBigInt.Uint64() % uint64(m)

	return &LCG{state: seedUint64}, nil
}

// Next generates a random number between 0 and 1
func (lcg *LCG) Next() float64 {
	lcg.state = (a*lcg.state + c) % m
	return float64(lcg.state) / float64(m-1)
}

func drawRouletteRound () (int, error) {

	randomHash, err := GenerateRandomHash()
	if err != nil {
		fmt.Println("Error generating random hash:", err)
		return 0, err
	}
	fmt.Println("Random hash:", randomHash)
	lcgInstance, err := NewLCG(randomHash)
	if err != nil {
		fmt.Println("Error creating LCG instance:", err)
		return 0, err
	}
	randomNumber := lcgInstance.Next()
	fmt.Println("Random number:", randomNumber)

	// Calculate the winning number
	winningNumber := int((randomNumber) * 36)
	fmt.Println("Winning number:", winningNumber)

	return winningNumber, nil
}

func GenerateRandomHash() (string, error) {
	// Create a byte slice with a length of 16 bytes
	randomBytes := make([]byte, 16)

	// Fill the byte slice with random data
	_, err := rand.Read(randomBytes)
	if err != nil {
		return "", err
	}

	// Convert the byte slice to a hexadecimal string
	randomString := hex.EncodeToString(randomBytes)
	return randomString, nil
}

func getJson(data interface{}) ([]byte, error) {
	return json.Marshal(data)
}
