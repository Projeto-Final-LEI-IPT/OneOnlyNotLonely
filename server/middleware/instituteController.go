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

//db = config.DbConnect()

func GetAllInstitute(w http.ResponseWriter, r *http.Request) {
	config.SetupCors(&w,r)
	if(*r).Method == "OPTIONS"{
		return
	}
	payload := getAllInstitutions()
	_=json.NewEncoder(w).Encode(payload)
}

func GetInstitution(w http.ResponseWriter, r *http.Request) {
	config.SetupCors(&w,r)
	if(*r).Method == "OPTIONS"{
		return
	}
	params := mux.Vars(r)
	payload := getInstitution(params["id"])
	_=json.NewEncoder(w).Encode(payload)
}

func CreateInstitution(w http.ResponseWriter, r *http.Request) {
	config.SetupCors(&w,r)
	if(*r).Method == "OPTIONS"{
		return
	}
	err := r.ParseForm()
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	var inst model.Institution
	_=json.NewDecoder(r.Body).Decode(&inst)
	insertOneInstitution(inst)
	_=json.NewEncoder(w).Encode(inst)
}

func UpdateInstitution (w http.ResponseWriter, r * http.Request){
	config.SetupCors(&w,r)
	if (*r).Method == "OPTIONS" {
		return
	}

	params := mux.Vars(r)
	err := r.ParseForm()
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	var inst model.Institution
	_ = json.NewDecoder(r.Body).Decode(&inst)
	updateInstitution(params["id"], inst)
	_ = json.NewEncoder(w).Encode(params["id"])
}


func DeleteInstitution(w http.ResponseWriter, r *http.Request) {
	config.SetupCors(&w,r)
	if(*r).Method == "OPTIONS"{
		return
	}
	params := mux.Vars(r)
	deleteOneInst(params["id"])
	_=json.NewEncoder(w).Encode(params["id"])
}

func getAllInstitutions() []model.Institution {
	var insts []model.Institution
	db.Find(&insts)
	return insts
}

func getInstitution(instId string) model.Institution {
	var inst model.Institution
	instIdInt, _ := strconv.Atoi(instId)
	db.Find(&inst, instIdInt)
	return inst
}

func insertOneInstitution(inst model.Institution) {
	insertedInst := inst
	result := db.Create(&insertedInst)
	if result.Error != nil {
		log.Fatal(result.Error.Error())
	}
	fmt.Println("Inserted a Single Institution:", insertedInst.ID)
}

func updateInstitution(instId string, inst model.Institution) model.Institution {
	insertedId,_ := strconv.Atoi(instId)
	var instOld model.Institution
	db.Find(&instOld, insertedId)
	instOld = inst
	db.Save(&instOld)
	return instOld
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
