package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"gorm.io/gorm"
	"time"
)

type Box struct {
	gorm.Model
	ID         	int				   `gorm:primaryKey json:"_id,omitempty`
	Status      string             `json:"status,omitempty"`
	Latitude    float64            `json:"latitude,omitempty"`
	Longitude   float64            `json:"longitude,omitempty"`
	Description string             `json:"description,omitempty"`
}

type Institution struct {
	gorm.Model
	ID       int				`gorm:"primaryKey" json:"_id,omitempty"`
	Name     string             `json:"name,omitempty"`
	Address  string             `json:"address,omitempty"`
	PostCode string             `json:"postal_code,omitempty"`
}

type OldOne struct {
	gorm.Model
	ID        primitive.ObjectID ` gorm:"primaryKey" json:"_id,omitempty bson:"_id,omitempty"`
	NumUtente int64              `json:"client_number,omitempty"`
	Name      string             `json:"name,omitempty"`
	Address   string             `json:"address,omitempty"`
	CodPostal string             `json:"cod_postal"`
	Level     int                `json:"level"`
	InstID Institution `gorm:"embedded"`
}

type Activity struct {
	gorm.Model
	ID          primitive.ObjectID `gorm: "primaryKey" json:"_id,omitempty`
	Name        string
	Description string
	Level       int
}

type OldOneBox struct {
	gorm.Model
	Utente           OldOne    `gorm:"primaryKey,embedded" json:"utente"`
	Caixa            Box       `gorm:"primaryKey,embedded" json:"caixa"`
	DataEntrega      time.Time `json:"data_entrega"`
	DataLevantamento time.Time `json:"data_levantamento , omitempty"`
	Feedback         string    `json:"feedback"`
}

type ActividadeCaixa struct {
	gorm.Model
	ActId Activity `gorm:"primaryKey,embedded" json:"activity"`
	BoxId Box      `gorm:"primaryKey,embedded" json:"box"`
}
