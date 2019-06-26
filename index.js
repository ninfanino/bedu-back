const express = require('express')
const app = express()
let bodyParser = require('body-parser');
const port = 3001
let MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectId;
let url = "mongodb+srv://admin:admin@cluster0-ytsob.mongodb.net/test?retryWrites=true&w=majority"

var cors = require('cors')

app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/demo', (req, res)=>{
console.log("demo funcionando");
res.send("demo funcionando")

})

app.listen(port, ()=>{
    console.log("Server online");
    
})