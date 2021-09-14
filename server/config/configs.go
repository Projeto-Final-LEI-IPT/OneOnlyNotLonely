package config

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"io/ioutil"
	"log"
	"net/http"
)



func DbConnect() *gorm.DB {
	dat, _ := ioutil.ReadFile("../server/sql.env")
	connectionString := fmt.Sprintf("%v", string(dat))

	db, err := gorm.Open(mysql.Open(connectionString), &gorm.Config{})
	if err != nil {
		log.Fatal(err.Error())
	}
	fmt.Println("Connected to db")
	return db
}


func SetupCors(w *http.ResponseWriter,r *http.Request){
	(*w).Header().Set("Access-Control-Allow-Origin","*")
	(*w).Header().Set("Access-Control-Allow-Methods","POST ,GET ,PUT ,DELETE,OPTIONS")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}


var DB= DbConnect()