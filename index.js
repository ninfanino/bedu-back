const express = require('express');
var cors = require('cors');
const app = express();
app.use(cors());
const os = require('os')
let bodyParser = require('body-parser')

var MongoClient = require('mongodb').MongoClient;
let url = "mongodb+srv://admin:admin@cluster0-h9sgx.mongodb.net/test?retryWrites=true";
let ObjectId = require('mongodb').ObjectId;

const port = 3001;



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("claseJs");
        dbo.collection("users").find({}).toArray( function(err, result) {
          if (err) throw err;
          
          res.send(result)
          db.close();
        });
      });
});
app.listen(port, function () {
    console.log('Example app listening on port 3000!');
  });
  