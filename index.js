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
    MongoClient.connect(url, { useNewUrlParser: true }, (err, db) =>{
        if (err) throw err;
        var dbo = db.db("xuxo");
        dbo.collection("Users").find({}).toArray(function(err, result) {
          if (err) throw err;
           res.send(result)
          db.close();
        });
      });
})

app.post('/postDemo', (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
        if (err) throw err;
        var dbo = db.db("xuxo");
        var myobj = { 
                        username: req.body.username,
                        password: req.body.password 
                    };
        dbo.collection("Users").insertOne(myobj, (err, res) => {
          if (err) throw err;
          console.log("1 document inserted");
         
          db.close();
        });
      });
      res.send({msg:"All ok"})
})

app.put('/updateDemo', (req,res)=>{
    MongoClient.connect(url, { useNewUrlParser: true } , function(err, db) {
        if (err) throw err;
        var dbo = db.db("xuxo");
        var myquery = { _id : ObjectId(req.body.id)};
        var newvalues = { $set: {username: req.body.username, password: req.body.password } };
        dbo.collection("Users").updateOne(myquery, newvalues, function(err, res) {
          if (err) throw err;
          console.log("1 document updated");
          db.close();
        });
      });
    res.send({msg:"ALL OK"})
})  

app.delete('/deleteDemo' , (req,res)=>{

    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("xuxo");
        var myquery = { _id : ObjectId(req.body.id) };
        dbo.collection("Users").deleteOne(myquery, function(err, obj) {
          if (err) throw err;
          console.log("1 document deleted");
          db.close();
        });
      });
    res.send({msg:"ALL_OK"})
})


app.listen(port, ()=>{
    console.log("Server online");
    
})