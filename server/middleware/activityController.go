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

func GetAllActivity(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-type", "application/json")
	w.Header().Set("Access-control-allow-Origin", "*")
	payload := getAllActivity()
	json.NewEncoder(w).Encode(payload)
}

func GetActivity(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-type", "application/json")
	w.Header().Set("Access-control-allow-Origin", "*")
	params := mux.Vars(r)
	payload := getActivity(params["id"])
	json.NewEncoder(w).Encode(payload)
}

func CreateActivity(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/form-data")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Header", "content-type")
	err := r.ParseForm()
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	var act model.Activity
	act.Name = r.FormValue("Name")
	act.Description = r.FormValue("Description")
	act.Type = r.FormValue("Type")
	act.Theme = r.FormValue("Theme")
	act.Level, _ = strconv.Atoi(r.FormValue("Level"))
	insertOneActivity(act)
	json.NewEncoder(w).Encode(act)
}

func DeleteActivity(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Header", "content-type")

	params := mux.Vars(r)
	deleteOneActivity(params["id"])
	json.NewEncoder(w).Encode(params["id"])
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

func insertOneActivity(inst model.Activity) {
	insertedInst := inst
	result := db.Create(&insertedInst)
	if result.Error != nil {
		log.Fatal(result.Error.Error())
	}
	fmt.Println("Inserted a Single Record:", insertedInst.ID)
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
