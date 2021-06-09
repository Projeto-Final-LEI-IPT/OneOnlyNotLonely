package middleware

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"server/model"
	"strconv"
)

func GetAllUtente(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-type", "application/json")
	w.Header().Set("Access-control-allow-Origin", "*")
	payload := getAllUtente()
	json.NewEncoder(w).Encode(payload)
}

func GetUtente(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-type", "application/json")
	w.Header().Set("Access-control-allow-Origin", "*")
	params := mux.Vars(r)
	payload := getInstitution(params["id"])
	json.NewEncoder(w).Encode(payload)
}

func CreateUtente(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/form-data")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Header", "content-type")
	err := r.ParseForm()
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	var utente model.OldOne
	utente.Name = r.FormValue("Name")
	utente.NumUtente, _ = strconv.Atoi(r.FormValue("NumUtente"))
	utente.Address = r.FormValue("Address")
	utente.CodPostal = r.FormValue("PostCode")
	utente.Level, _ = strconv.Atoi(r.FormValue("Level"))
	insertOneUtente(utente)
	json.NewEncoder(w).Encode(utente)
}

func DeleteUtente(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Header", "content-type")

	params := mux.Vars(r)
	deleteOneUtente(params["id"])
	json.NewEncoder(w).Encode(params["id"])
}

func getAllUtente() []model.OldOne {
	var utentes []model.OldOne
	db.Find(&utentes)
	return utentes
}

func getUtente(boxId string) model.OldOne {
	var utente model.OldOne
	utenteIdInt, _ := strconv.Atoi(boxId)
	db.Find(&utente, utenteIdInt)
	return utente
}

func insertOneUtente(utente model.OldOne) {
	insertedUtente := utente
	result := db.Create(&insertedUtente)
	if result.Error != nil {
		log.Fatal(result.Error.Error())
	}
	fmt.Println("Inserted a Single Record:", insertedUtente.ID)
}

func deleteOneUtente(utenteID string) {
	var utentes []model.OldOne
	id, _ := strconv.Atoi(utenteID)
	d := db.Delete(&utentes, id)
	if d.Error != nil {
		log.Fatal(d.Error.Error())
	}
	fmt.Println("Deleted OldOne", d.RowsAffected)
}
