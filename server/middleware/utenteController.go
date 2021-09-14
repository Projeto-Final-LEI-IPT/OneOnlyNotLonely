package middleware

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"server/config"
	"server/model"
	"strconv"
)

func GetAllUtente(w http.ResponseWriter, r *http.Request) {
	config.SetupCors(&w, r)
	if (*r).Method == "OPTIONS" {
		return
	}
	payload := getAllElder()
	_ = json.NewEncoder(w).Encode(payload)
}

func GetUtente(w http.ResponseWriter, r *http.Request) {
	config.SetupCors(&w, r)
	if (*r).Method == "OPTIONS" {
		return
	}
	params := mux.Vars(r)
	payload := getElder(params["id"])
	_ = json.NewEncoder(w).Encode(payload)
}

func CreateUtente(w http.ResponseWriter, r *http.Request) {
	config.SetupCors(&w, r)
	err := r.ParseForm()
	if (*r).Method == "OPTIONS" {
		return
	}
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	var elder model.Elder
	_ = json.NewDecoder(r.Body).Decode(&elder)
	insertOneElder(elder)
	_ = json.NewEncoder(w).Encode(elder)
}

func UpdateUtente(w http.ResponseWriter, r *http.Request) {
	config.SetupCors(&w, r)
	if (*r).Method == "OPTIONS" {
		return
	}

	params := mux.Vars(r)
	err := r.ParseForm()
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	var elder model.Elder
	_ = json.NewDecoder(r.Body).Decode(&elder)
	updateElder(params["id"], elder)
	_ = json.NewEncoder(w).Encode(params["id"])
}

func DeleteUtente(w http.ResponseWriter, r *http.Request) {
	config.SetupCors(&w, r)
	if (*r).Method == "OPTIONS" {
		return
	}
	params := mux.Vars(r)
	deleteOneUtente(params["id"])
	_ = json.NewEncoder(w).Encode(params["id"])
}

func getAllElder() []model.Elder {
	var utentes []model.Elder
	db.Find(&utentes)
	return utentes
}

func getElder(utenteId string) model.Elder {
	var utente model.Elder
	utenteIdInt, _ := strconv.Atoi(utenteId)
	db.Find(&utente, utenteIdInt)
	return utente
}
func updateElder(utenteId string, elder model.Elder) model.Elder {
	elderIdInt, _ := strconv.Atoi(utenteId)
	var elderOld model.Elder
	db.Find(&elderOld, elderIdInt)
	elderOld = elder
	db.Save(&elderOld)
	fmt.Println("Updated elder :" , elderOld.ID)
	return elderOld
}

func insertOneElder(elder model.Elder) {
	insertedElder := elder
	result := db.Create(&insertedElder)
	if result.Error != nil {
		log.Fatal(result.Error.Error())
	}
	fmt.Println("Inserted a Single Elder:", insertedElder.ID)
}

func deleteOneUtente(elderID string) {
	var elders []model.Elder
	id, _ := strconv.Atoi(elderID)
	d := db.Delete(&elders, id)
	if d.Error != nil {
		log.Fatal(d.Error.Error())
	}
	fmt.Println("Deleted elder", d.RowsAffected)
}
