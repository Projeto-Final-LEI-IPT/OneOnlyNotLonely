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

var db = config.DB

func setupCors(w *http.ResponseWriter,req *http.Request){
	(*w).Header().Set("Access-Control-Allow-Origin","*")
	(*w).Header().Set("Access-Control-Allow-Methods","POST ,GET ,OPTIONS ,PUT ,DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

}


//GetAllBox get all box route
func GetAllBox(w http.ResponseWriter, r *http.Request) {
	setupCors(&w , r)
	if(*r).Method == "OPTIONS"{
		return
	}
	payload := getAllBox()
	json.NewEncoder(w).Encode(payload)
}

func GetBox(w http.ResponseWriter, r *http.Request) {
	setupCors(&w , r)
	if(*r).Method == "OPTIONS"{
		return
	}
	params := mux.Vars(r)
	payload := getBox(params["id"])
	json.NewEncoder(w).Encode(payload)
}

func CreateBox(w http.ResponseWriter, r *http.Request) {
	setupCors(&w , r)
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	if(*r).Method == "OPTIONS"{
		return
	}

	var box model.Box
	_ = json.NewDecoder(r.Body).Decode(&box)
	fmt.Println(box)
	insertOneBox(box)
	json.NewEncoder(w).Encode(box)
}

func UpdateBox(w http.ResponseWriter, r *http.Request){
	setupCors(&w , r)
	if(*r).Method == "OPTIONS"{
		return
	}

	params := mux.Vars(r)
	err := r.ParseForm()
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	var box model.Box
	box.Status = r.FormValue("Status")
	box.Latitude, _ = strconv.ParseFloat(r.FormValue("Latitude"), 64)
	box.Longitude, _ = strconv.ParseFloat(r.FormValue("Longitude"), 64)
	box.Description = r.FormValue("Description")
	box.Theme = r.FormValue("Theme")
	updateBox(params["id"],box)
	json.NewEncoder(w).Encode(params["id"])
}



func DeleteBox(w http.ResponseWriter, r *http.Request) {
	setupCors(&w , r)
	if(*r).Method == "OPTIONS"{
		return
	}

	params := mux.Vars(r)
	deleteOneBox(params["id"])
	json.NewEncoder(w).Encode(params["id"])
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

func updateBox(boxId string,box model.Box)model.Box{
	boxIdInt, _ := strconv.Atoi(boxId)
	db.Find(&box, boxIdInt)
	db.Save(&box)
	return box
}

func insertOneBox(box model.Box) {
	insertedBox := box
	result := db.Create(&insertedBox)
	if result.Error != nil {
		log.Fatal(result.Error.Error())
	}
	fmt.Println("Inserted a Single Record:", insertedBox.ID)
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
