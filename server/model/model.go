package model

import (
	"gorm.io/gorm"
	"server/config"
	"time"
)

type Institution struct {
	gorm.Model
	ID        int     `gorm:"primaryKey" json:"ID,omitempty"`
	Name      string  `json:"name,omitempty"`
	Address   string  `json:"address,omitempty"`
	PostCode  string  `json:"codPostal,omitempty"`
	Latitute  float64 `json:"latitute_Institution,omitempty"`
	Longitude float64 `json:"longitude_Institution,omitempty"`
	Tipo      string  `json:"type,omitempty"`
	Elders    []Elder `gorm:"foreignKey: InstID"`
}

type Elder struct {
	gorm.Model
	ID        int     ` gorm:"primaryKey" json:"ID,omitempty"`
	NumUtente int     `json:"numUtente,omitempty"`
	Name      string  `json:"name,omitempty"`
	Address   string  `json:"address,omitempty"`
	CodPostal string  `json:"codPostal,omitempty"`
	Latitude  float64 `json:"latitude,omitempty"`
	Longitude float64 `json:"longitude,omitempty"`
	Level     int     `json:"level,omitempty"`
	Likes     string  `json:"likes,omitempty"`
	InstID    int     `json:"inst,omitempty"`
	Boxes     []Box   `gorm:"foreignKey:OldOne"`
}

type Box struct {
	gorm.Model
	ID               int         `gorm:"primaryKey" json:"ID"`
	Status           string      `json:"status,omitempty"`
	Latitude         float64     `json:"latitude,omitempty"`
	Longitude        float64     `json:"longitude,omitempty"`
	Description      string      `json:"description,omitempty"`
	OldOne           int         `json:"oldOne"`
	Theme            string      `json:"theme,omitempty"`
	DataEntrega      time.Time   `json:"dataEntrega,omitempty"`
	DataLevantamento time.Time   `json:"dataLevantamento,omitempty"`
	Feedback         string      `json:"feedback,omitempty"`
	Activity         []Activity `gorm:"many2many:box_activity"`
}

type Activity struct {
	gorm.Model
	ID       int    `gorm:"primaryKey" json:"ID"`
	Name        string `json:"name,omitempty"`
	Description string `json:"description,omitempty"`
	Level       int    `json:"level,omitempty"`
	Type        string `json:"type,omitempty"`
	Theme       string `json:"theme,omitempty"`
}

func init() {
	db := config.DB
	_ = db.AutoMigrate(&Institution{}, &Activity{}, &Elder{}, &Box{}, &Activity{})
}
