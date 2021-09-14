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
	"strings"
)

var db = config.DB

//GetAllBox get all box route
func GetAllBox(w http.ResponseWriter, r *http.Request) {
	config.SetupCors(&w, r)
	if (*r).Method == "OPTIONS" {
		return
	}
	payload := getAllBox()
	_ = json.NewEncoder(w).Encode(payload)
}

func GetActivityByBox(w http.ResponseWriter, r *http.Request) {
	config.SetupCors(&w, r)
	if (*r).Method == "OPTIONS" {
		return
	}
	params := mux.Vars(r)
	payload := getActivityByBox(params["id"])
	_ = json.NewEncoder(w).Encode(payload)
}

func GetBox(w http.ResponseWriter, r *http.Request) {
	config.SetupCors(&w, r)
	if (*r).Method == "OPTIONS" {
		return
	}
	params := mux.Vars(r)
	payload := getBox(params["id"])
	_ = json.NewEncoder(w).Encode(payload)
}

func CreateBox(w http.ResponseWriter, r *http.Request) {
	config.SetupCors(&w, r)
	if (*r).Method == "OPTIONS" {
		return
	}

	var box model.Box
	_ = json.NewDecoder(r.Body).Decode(&box)
	insertOneBox(box)
	_ = json.NewEncoder(w).Encode(box)
}

func AssignActsBox(w http.ResponseWriter, r *http.Request) {
	config.SetupCors(&w, r)
	if (*r).Method == "OPTIONS" {
		return
	}
	var actID string
	_ = json.NewDecoder(r.Body).Decode(&actID)
	params := mux.Vars(r)
	fmt.Println(params["id"], actID)
	assignActBox(params["id"], actID)
	fmt.Println(getActivityByBox(params["id"]))
}

func UpdateBox(w http.ResponseWriter, r *http.Request) {
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
	var box model.Box
	_ = json.NewDecoder(r.Body).Decode(&box)
	updateBox(params["id"], box)
	_ = json.NewEncoder(w).Encode(params["id"])
}

func DeleteBox(w http.ResponseWriter, r *http.Request) {
	config.SetupCors(&w, r)
	if (*r).Method == "OPTIONS" {
		return
	}
	params := mux.Vars(r)
	deleteOneBox(params["id"])
	_ = json.NewEncoder(w).Encode(params["id"])
}

func getAllBox() []model.Box {
	var boxes []model.Box
	db.Find(&boxes)
	return boxes
}

func getBox(boxId string) model.Box {
	var box model.Box
	boxIdInt, _ := strconv.Atoi(boxId)
	db.Find(&box, boxIdInt)
	return box
}

func getActivityByBox(boxId string) []model.Activity {
	var act []model.Activity
	var boxes model.Box
	boxIdInt, _ := strconv.Atoi(boxId)
	_ = db.Model(&boxes).Where("ID = ?", boxIdInt).Association("Activity").Find(&act)
	return act
}

func updateBox(boxId string, box model.Box) model.Box {
	boxIdInt, _ := strconv.Atoi(boxId)
	var boxOld model.Box
	db.Find(&boxOld, boxIdInt)
	boxOld = box
	db.Save(&boxOld)
	fmt.Println("Updated Box :", boxOld.ID)
	return boxOld
}

func assignActBox(boxId string, actIDs string) {
	var box model.Box
	actidString := strings.Split(actIDs, ",")
	fmt.Println(actidString)
	var actIdInt [4]int
	for i := 0; i <4; i++ {
		fmt.Print(actidString[i])
		actIdInt[i], _ = strconv.Atoi(actidString[i])
		fmt.Println(actIdInt[i])
	}
	var acts []model.Activity
	_ = db.Find(&acts, actIdInt)

	boxIdInt, _ := strconv.Atoi(boxId)
	_ = db.First(&box, boxIdInt)
	fmt.Println(box)
	_ = db.Model(&box).Association("Activity").Append(acts)
	fmt.Println(box)
}

func insertOneBox(box model.Box) {
	insertedBox := box
	result := db.Create(&insertedBox)
	if result.Error != nil {
		log.Fatal(result.Error.Error())
	}
	fmt.Println("Inserted a new Box:", insertedBox.ID)
}

func deleteOneBox(box string) {
	var boxes []model.Box
	id, _ := strconv.Atoi(box)
	d := db.Delete(&boxes, id)
	if d.Error != nil {
		log.Fatal(d.Error.Error())
	}
	fmt.Println("Deleted Box", d.RowsAffected)
}
