package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Box struct {
	ID primitive.ObjectID `json:"_id,omitempty bson:"_id,omitempty"`
	Status string 	`json:"status,omitempty"`
	Latitude float64	`json:"latitude,omitempty"`
	Longitude float64 `json:"longitude,omitempty"`
	Description string  `json:"description,omitempty"`
	}


type Institution struct {
	ID primitive.ObjectID `json:"_id,omitempty bson:"_id,omitempty"`
	Name string `json:"Name,omitempty"`
	Address string `json:"address,omitempty"`
	PostCode string  `json:"postal_code,omitempty"`
}

type OldOne struct {
	ID          primitive.ObjectID `json:"_id,omitempty bson:"_id,omitempty"`
	NumUtente   int64              `json:"client_number,omitempty"`
	Name        string             `json:"name,omitempty"`
	Address 	string
	CodPostal   string
	Level 		int
	//id referencial para Instituicoes
	InstID 		int64			`json:"InstID,omitempty"`
}

type Activity struct {
	ID 			primitive.ObjectID `json:"_id,omitempty bson:"_id,omitempty"`
	Name 		string
	Description string
	Level 		int
}


