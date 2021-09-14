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

func GetAllActivity(w http.ResponseWriter, r *http.Request) {
	config.SetupCors(&w, r)
	payload := getAllActivity()
	_ = json.NewEncoder(w).Encode(payload)
}

func GetActivity(w http.ResponseWriter, r *http.Request) {
	config.SetupCors(&w, r)
	params := mux.Vars(r)
	payload := getActivity(params["id"])
	_ = json.NewEncoder(w).Encode(payload)
}

func CreateActivity(w http.ResponseWriter, r *http.Request) {
	config.SetupCors(&w, r)
	err := r.ParseForm()
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	var act model.Activity
	_=json.NewDecoder(r.Body).Decode(&act)
	insertOneActivity(act)
	_ = json.NewEncoder(w).Encode(act)
}

func DeleteActivity(w http.ResponseWriter, r *http.Request) {
	config.SetupCors(&w, r)
	params := mux.Vars(r)
	deleteOneActivity(params["id"])
	_ = json.NewEncoder(w).Encode(params["id"])
}

func UpdateActivity(w http.ResponseWriter, r *http.Request){
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
	var act model.Activity
	_ = json.NewDecoder(r.Body).Decode(&act)
	updateAct(params["id"], act)
	_ = json.NewEncoder(w).Encode(params["id"])
}



func getAllActivity() []model.Activity {
	var activities []model.Activity
	db.Find(&activities)
	return activities
}

func getActivity(actId string) model.Activity {
	var act model.Activity
	actIdInt, _ := strconv.Atoi(actId)
	db.Find(&act, actIdInt)
	return act
}

func insertOneActivity(act model.Activity) {
	insertedAct := act
	result := db.Create(&insertedAct)
	if result.Error != nil {
		log.Fatal(result.Error.Error())
	}
	fmt.Println("Inserted a New Activity:", insertedAct.ID)
}

func updateAct(actID string, act model.Activity) model.Activity {
	boxIdInt, _ := strconv.Atoi(actID)
	var actOld model.Activity
	db.Find(&actOld, boxIdInt)
	actOld= act
	db.Save(&actOld)
	fmt.Println("Updated activity :" , actOld.ID)
	return act
}

func deleteOneActivity(actID string) {
	var acts []model.Institution
	id, _ := strconv.Atoi(actID)
	d := db.Delete(&acts, id)
	if d.Error != nil {
		log.Fatal(d.Error.Error())
	}
	fmt.Println("Deleted Activity", d.RowsAffected)
}
