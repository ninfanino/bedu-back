let MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectId;
let url = "mongodb+srv://admin:admin@cluster0-ytsob.mongodb.net/test?retryWrites=true&w=majority"

module.exports = (app) => {
    app.get('/pets', (req, res)=>{
        MongoClient.connect(url, { useNewUrlParser: true }, (err, db) =>{
            if (err) throw err;
            var dbo = db.db("xuxo");
            dbo.collection("Pets").find({}).toArray(function(err, result) {
              if (err) throw err;
               res.send(result)
              db.close();
            });
          });
    })
    
    app.post('/pets', (req, res) => {
        MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
            if (err) throw err;
            var dbo = db.db("xuxo");
            var myobj = { 
                            petname: req.body.PetName,
                            owner: req.body.owner,
                            age: req.body.age, 
                            kind: req.body.kind,
                            race: req.body.race,
                            gender: req.body.gender,
                            // photo1: req.body.photo1,
                            // photo2: req.body.photo2,
                            certificate: req.body.certificate,
                            emergency: req.body.emergency,
                            inadoption: req.body.inadoption,
                            lost: req.body.lost,
                            found: req.body.found,
                            inlove: req.body.inlove,
                            contactphone: req.body.contactphone
                            
                        };
            dbo.collection("Pets").insertOne(myobj, (err, res) => {
              if (err) throw err;
              console.log("1 document inserted");
             
              db.close();
            });
          });
          res.send({msg:"All ok"})
    })
    
    app.put('/pets', (req,res)=>{
        MongoClient.connect(url, { useNewUrlParser: true } , function(err, db) {
            if (err) throw err;
            var dbo = db.db("xuxo");
            var myquery = { _id : ObjectId(req.body.id)};
            var newvalues = { $set: { 
              petname: req.body.PetName,
              owner: req.body.owner,
              age: req.body.age, 
              kind: req.body.kind,
              race: req.body.race,
              gender: req.body.gender,
              photo1: req.body.photo1,
              photo2: req.body.photo2,
              certificate: req.body.certificate,
              emergency: req.body.emergency,
              inadoption: req.body.inadoption,
              lost: req.body.lost,
              found: req.body.found,
              inlove: req.body.inlove,
              contactphone: req.body.contactphone
              
          } };
            dbo.collection("Pets").updateOne(myquery, newvalues, function(err, res) {
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
            dbo.collection("Pets").deleteOne(myquery, function(err, obj) {
              if (err) throw err;
              console.log("1 document deleted");
              db.close();
            });
          });
        res.send({msg:"ALL_OK"})
    })
}

