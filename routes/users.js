let MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectId;
let url = "mongodb+srv://admin:admin@cluster0-ytsob.mongodb.net/test?retryWrites=true&w=majority"

module.exports = (app) => {
    app.get('/users', (req, res)=>{
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
    
    app.post('/users', (req, res) => {
        MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
            if (err) throw err;
            var dbo = db.db("Users");
            var myobj = { 
                            name: req.body.name,
                            password: req.body.password 
                        };
            dbo.collection("Dogs").insertOne(myobj, (err, res) => {
              if (err) throw err;
              console.log("1 document inserted");
             
              db.close();
            });
          });
          res.send({msg:"All ok"})
    })
    
    app.put('/users', (req,res)=>{
        MongoClient.connect(url, { useNewUrlParser: true } , function(err, db) {
            if (err) throw err;
            var dbo = db.db("xuxo");
            var myquery = { _id : ObjectId(req.body.id)};
            var newvalues = { $set: {name: req.body.name, password: req.body.password } };
            dbo.collection("Users").updateOne(myquery, newvalues, function(err, res) {
              if (err) throw err;
              console.log("1 document updated");
              db.close();
            });
          });
        res.send({msg:"ALL OK"})
    })  
    
    app.delete('/dogs' , (req,res)=>{
    
        MongoClient.connect(url, (err, db) => {
            if (err) throw err;
            var dbo = db.db("xuxo");
            var myquery = { _id : ObjectId(req.body.id) };
            dbo.collection("Dogs").deleteOne(myquery, function(err, obj) {
              if (err) throw err;
              console.log("1 document deleted");
              db.close();
            });
          });
        res.send({msg:"ALL_OK"})
    })
}

