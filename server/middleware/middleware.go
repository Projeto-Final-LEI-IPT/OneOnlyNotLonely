package middleware
import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"server/model"
	"github.com/gorilla/mux"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

//DB connection String
const connectionString ="mongodb+srv://Ninja:CocaCola123@cambadadeidiotas.ks4f6.mongodb.net/ElderLootbox?retryWrites=true&w=majority"

//to be continued