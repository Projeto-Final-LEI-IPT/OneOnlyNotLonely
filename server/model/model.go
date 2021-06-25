package model

import (
	"gorm.io/gorm"
	"time"
)

type Box struct {
	gorm.Model
	ID          uint     `gorm:primaryKey json:"ID,omitempty`
	Status      string  `json:"status,omitempty"`
	Latitude    float64 `json:"latitude,omitempty"`
	Longitude   float64 `json:"longitude,omitempty"`
	Description string  `json:"description,omitempty"`
	Theme       string  `json:"theme,omitempty"`
}

type Institution struct {
	gorm.Model
	ID       int    `gorm:"primaryKey" json:"id,omitempty"`
	Name     string `json:"name,omitempty"`
	Address  string `json:"address,omitempty"`
	PostCode string `json:"postal_code,omitempty"`
	Tipo     string `json:"type,omitempty"`
}

type OldOne struct {
	gorm.Model
	ID        int         ` gorm:"primaryKey" json:"_id,omitempty bson:"id,omitempty"`
	NumUtente int         `json:"client_number,omitempty"`
	Name      string      `json:"name,omitempty"`
	Address   string      `json:"address,omitempty"`
	CodPostal string      `json:"CodPostal,omitempty"`
	Level     int         `json:"level,omitempty"`
	InstID    Institution `gorm:"foreignKey:InstitutionRefer"`
}

type Activity struct {
	gorm.Model
	ID          int    `gorm: "primaryKey" json:"id,omitempty`
	Name        string `json:"Name,omitempty"`
	Description string `json:description,omitempty`
	Level       int    `json:"level,omitempty"`
	Type        string `json:"tipo,omitempty"`
	Theme       string `json:"theme,omitempty"`
}

type OldOneBox struct {
	gorm.Model
	Utente           OldOne    `gorm:"primaryKey,foreignKey:OldOneRefer" json:"utente"`
	Caixa            Box       `gorm:"primaryKey,foreignKey:BoxRefer" json:"caixa"`
	DataEntrega      time.Time `json:"data_entrega,omitempty"`
	DataLevantamento time.Time `json:"data_levantamento , omitempty"`
	Feedback         string    `json:"feedback,omitempty"`
}

type ActividadeCaixa struct {
	gorm.Model
	ActId Activity `gorm:"primaryKey,foreignKey:ActivityRefer" json:"Activity"`
	BoxId Box      `gorm:"primaryKey,foreignKey:BoxRefer" json:"Box"`
}

/*
func init(){
	db:=config.DB
	db.AutoMigrate(&Box{},&Activity{},&OldOne{},&Institution{},&ActividadeCaixa{},&OldOneBox{})
}
**/