package main

import (
	"fmt"
	"log"
	"net/http"
	"server/router"
)

func main() {
	r := router.Router()
	fmt.Println("Starting server on port 6060...")
	log.Fatal(http.ListenAndServe(":6060", r))
}
