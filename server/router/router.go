package router

import (
	"github.com/gorilla/mux"
	"server/middleware"
)

//Router is exported and used in main.go
func Router() *mux.Router {
	router := mux.NewRouter()
	router.HandleFunc("/api/box", middleware.GetAllBox).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/box/{id}", middleware.GetBox).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/box", middleware.CreateBox).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/deleteBox/{id}", middleware.DeleteBox).Methods("DELETE", "OPTIONS")
	return router
}
