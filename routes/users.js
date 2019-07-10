let MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectId;
let url = "mongodb+srv://admin:admin@cluster0-ytsob.mongodb.net/test?retryWrites=true&w=majority"

module.exports = (app) => {

  app.post('/login', (req,res) => {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("xuxo");
      var query = { name: req.body.user, password: req.body.pass };
      dbo.collection("Users").findOne(query, function(err, result) {
        if (err) throw err;
        if(result === null){
          res.status(404).send()
        }
        else{
          res.status(200).send()
        }
        db.close();
      });
    });
  });

  app.post('/signin', (req,res) => {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("xuxo");
      var query = { 
        email: req.body.email
        };
      var myobj = { 
          email: req.body.email,
          password: req.body.password 
      };
      dbo.collection("Users").findOne(query, function(err, result) {
        if(result === null){
          dbo.collection("Users").insertOne(myobj, function(err, result) {
            if (err) throw err;
          
            res.status(200).send("Usuario ingresado")
          
        })
        } else {
          res.status(404).send("Usuario existente")
      }
     
      
        db.close();
      });
    });
  });
  
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
    
    app.delete('/users' , (req,res)=>{
    
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

    
}

