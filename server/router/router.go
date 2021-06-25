package router

import (
	"github.com/gorilla/mux"
	"server/middleware"
)

//Router is exported and used in main.go
func Router() *mux.Router {
	router := mux.NewRouter()
	//BoxRouting
	router.HandleFunc("/box", middleware.GetAllBox).Methods("GET", "OPTIONS")
	router.HandleFunc("/box/{id}", middleware.GetBox).Methods("GET", "OPTIONS")
	router.HandleFunc("/box/{id}", middleware.UpdateBox).Methods("PUT	", "OPTIONS")
	router.HandleFunc("/box", middleware.CreateBox).Methods("POST", "OPTIONS")
	router.HandleFunc("/box/{id}", middleware.DeleteBox).Methods("DELETE", "OPTIONS")
	//InstitutionRouting
	router.HandleFunc("/institutions", middleware.GetAllInstitute).Methods("GET", "OPTIONS")
	router.HandleFunc("/institution/{id}", middleware.GetInstitution).Methods("GET", "OPTIONS")
	router.HandleFunc("/institution", middleware.CreateInstitution).Methods("POST", "OPTIONS")
	router.HandleFunc("/deleteInstitution/{id}", middleware.DeleteInstitution).Methods("DELETE", "OPTIONS")
	//UtenteRouting
	router.HandleFunc("/utente", middleware.GetAllUtente).Methods("GET", "OPTIONS")
	router.HandleFunc("/utente/{id}", middleware.GetUtente).Methods("GET", "OPTIONS")
	router.HandleFunc("/utente", middleware.CreateUtente).Methods("POST", "OPTIONS")
	router.HandleFunc("/deleteUtente/{id}", middleware.DeleteUtente).Methods("DELETE", "OPTIONS")
	//ActivityRouting
	router.HandleFunc("/activity", middleware.GetAllActivity).Methods("GET", "OPTIONS")
	router.HandleFunc("/activity/{id}", middleware.GetActivity).Methods("GET", "OPTIONS")
	router.HandleFunc("/activity", middleware.CreateActivity).Methods("POST", "OPTIONS")
	router.HandleFunc("/deleteActivity/{id}", middleware.DeleteActivity).Methods("DELETE", "OPTIONS")
	return router
}
