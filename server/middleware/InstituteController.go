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

//db = config.DbConnect()

func GetAllInstitute(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-type", "application/json")
	w.Header().Set("Access-control-allow-Origin", "*")
	payload := getAllInstitutions()
	json.NewEncoder(w).Encode(payload)
}

func GetInstitution(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-type", "application/json")
	w.Header().Set("Access-control-allow-Origin", "*")
	params := mux.Vars(r)
	payload := getInstitution(params["id"])
	json.NewEncoder(w).Encode(payload)
}

func CreateInstitution(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/form-data")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Header", "content-type")
	err := r.ParseForm()
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	var inst model.Institution
	inst.Name = r.FormValue("Name")
	inst.Address = r.FormValue("Address")
	inst.PostCode = r.FormValue("PostCode")
	inst.Tipo = r.FormValue("Type")
	insertOneInstitution(inst)
	json.NewEncoder(w).Encode(inst)
}

func DeleteInstitution(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Header", "content-type")

	params := mux.Vars(r)
	deleteOneInst(params["id"])
	json.NewEncoder(w).Encode(params["id"])
}

func getAllInstitutions() []model.Institution {
	var insts []model.Institution
	db.Find(&insts)
	return insts
}

func getInstitution(instId string) model.Institution {
	var inst model.Institution
	boxIdInt, _ := strconv.Atoi(instId)
	db.Find(&inst, boxIdInt)
	return inst
}

func insertOneInstitution(inst model.Institution) {
	insertedInst := inst
	result := db.Create(&insertedInst)
	if result.Error != nil {
		log.Fatal(result.Error.Error())
	}
	fmt.Println("Inserted a Single Record:", insertedInst.ID)
}

func deleteOneInst(instID string) {
	var insts []model.Institution
	id, _ := strconv.Atoi(instID)
	d := db.Delete(&insts, id)
	if d.Error != nil {
		log.Fatal(d.Error.Error())
	}
	fmt.Println("Deleted Institution", d.RowsAffected)
}
