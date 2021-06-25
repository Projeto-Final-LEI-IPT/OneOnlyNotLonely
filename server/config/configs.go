package config

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"io/ioutil"
	"log"
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

var DB= DbConnect();