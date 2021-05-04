package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type Box struct {
	ID primitive.ObjectID `json:"_id,omitempty
     bson:"_id,omitempty"`
	Description string  `json:"description,omitempty"`
	lat float32 `json:"lat,omitempty"`
	long float32 `json:"long, omitempty"`
	status string `json"status,omitempty"`
}

