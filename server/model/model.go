package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type Box struct {
	ID primitive.ObjectID `json:"_id,omitempty bson:"_id,omitempty"`
	Status string 	`json"status,omitempty"`
	Latitude float64	`json:"latitude,omitempty"`
	Longitude float64 `json:"longitude,omitempty"`
	Description string  `json:"description,omitempty"`
	}

