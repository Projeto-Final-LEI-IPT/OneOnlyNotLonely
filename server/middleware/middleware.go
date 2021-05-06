package middleware

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"io/ioutil"
	"log"
	"net/http"
	"server/model"
	"strconv"

)

//DB connection String

var connectionString =""

const dbName= "velhotesInc"

const colName="box"

var collection *mongo.Collection

func init(){
	dat, _ := ioutil.ReadFile("../server/.env")

	connectionString = fmt.Sprintf("%v",string(dat))

	fmt.Println(connectionString)

	//Set client Options
	clientOptions := options.Client().ApplyURI(connectionString)

	//Connect to MongoDb
	client,err := mongo.Connect(context.TODO(),clientOptions)

	if err!=nil{
		log.Fatal(err)
	}

	err=client.Ping(context.TODO(),nil)


	if err!=nil{
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDb!")

	collection = client.Database(dbName).Collection(colName)
	fmt.Println("Collection instance Created!")
}



//GetAllBox get all box route
func GetAllBox(w http.ResponseWriter,r *http.Request){
	w.Header().Set("Context-type","application/json")
	w.Header().Set("Access-control-allow-Origin","*")
	payload:=getAllBox()
	json.NewEncoder(w).Encode(payload)
}

func CreateBox(w http.ResponseWriter,r *http.Request){
	w.Header().Set("Context-Type","application/form-data")
	w.Header().Set("Access-Control-Allow-Origin","*")
	w.Header().Set("Access-Control-Allow-Methods","POST")
	w.Header().Set("Access-Control-Allow-Header","content-type")
	var box model.Box
	err := r.ParseForm()
	if err != nil{
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	box.Status=r.FormValue("Status")
	box.Latitude, _ =strconv.ParseFloat(r.FormValue("Latitude"),64)
	box.Longitude,_ = strconv.ParseFloat(r.FormValue("Longitude"),64)
	box.Description=r.FormValue("Description")

	insertOneBox(box)
	json.NewEncoder(w).Encode(box)
}


func DeleteBox(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Context-Type","application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin","*")
	w.Header().Set("Access-Control-Allow-Methods","POST")
	w.Header().Set("Access-Control-Allow-Header","content-type")

	params := mux.Vars(r)
	deleteOneTask(params["id"])
	json.NewEncoder(w).Encode(params["id"])
}

func DeleteAllBox(w http.ResponseWriter,r *http.Request){
	w.Header().Set("Context-type","application/x-www-form-urlencoded")
	w.Header().Set("Access-control-allow-Origin","*")
	count := deleteAllTask()
	json.NewEncoder(w).Encode(count)
}

func getAllBox() []primitive.M{
	cur,err := collection.Find(context.Background(),bson.D{{}})
	if err != nil{
		log.Fatal(err)
	}
	var results[]primitive.M
	for cur.Next(context.Background()){
		var result bson.M
		e := cur.Decode(&result)
		if e!=nil{
			log.Fatal(e)
		}
		results=append(results,result)
	}

	if err := cur.Err(); err !=nil{
		log.Fatal(err)
	}
	cur.Close(context.Background())

	return results

}

func insertOneBox(box model.Box){
		fmt.Println(box)
		insertResult,err := collection.InsertOne(context.Background(),box)

		if err != nil{
			log.Fatal(err)
		}
		fmt.Println("Inserted a Single Record ",insertResult.InsertedID)
}


func deleteOneTask(box string){
	fmt.Println(box)
	id,_ := primitive.ObjectIDFromHex(box)
	filter:= bson.M{"_id":id}
	d,err := collection.DeleteOne(context.Background(),filter)
	if err !=nil{
		log.Fatal(err)
	}
	fmt.Println("Deleted Box",d.DeletedCount)
}

func deleteAllTask()int64{
	d,err := collection.DeleteMany(context.Background(),bson.D{{}},nil)
	if err !=nil{
		log.Fatal(err)
	}

	fmt.Println("Deleted Document",d.DeletedCount)
	return d.DeletedCount
}





