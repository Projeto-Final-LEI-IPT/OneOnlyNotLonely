package router

import (
	"github.com/gorilla/mux"
	"server/middleware"
)

//Router is exported and used in main.go
func Router() *mux.Router {
	router := mux.NewRouter()
	//BoxRouting
	router.HandleFunc("/api/box", middleware.GetAllBox).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/box/{id}", middleware.GetBox).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/box", middleware.CreateBox).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/deleteBox/{id}", middleware.DeleteBox).Methods("DELETE", "OPTIONS")
	//InstitutionRouting
	router.HandleFunc("/api/institutions", middleware.GetAllInstitute).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/institution/{id}", middleware.GetInstitution).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/institution", middleware.CreateInstitution).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/deleteInstitution/{id}", middleware.DeleteInstitution).Methods("DELETE", "OPTIONS")
	//UtenteRouting
	router.HandleFunc("/api/utente", middleware.GetAllUtente).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/utentes/{id}", middleware.GetUtente).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/utente", middleware.CreateUtente).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/deleteUtente/{id}", middleware.DeleteUtente).Methods("DELETE", "OPTIONS")
	//ActivityRouting
	router.HandleFunc("/api/activity", middleware.GetAllActivity).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/activity/{id}", middleware.GetActivity).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/activity", middleware.CreateActivity).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/deleteActivity/{id}", middleware.DeleteActivity).Methods("DELETE", "OPTIONS")
	return router
}
