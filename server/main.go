package main

import (
	"fmt"
	"log"
	"net/http"
	"server/router"
)

func main() {
	r := router.Router()
	fmt.Println("Starting server on port 6080...")
	log.Fatal(http.ListenAndServe(":6080", r))
}
