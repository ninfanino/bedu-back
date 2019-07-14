let MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectId;
let url = "mongodb+srv://admin:admin@cluster0-ytsob.mongodb.net/test?retryWrites=true&w=majority"

module.exports = (app) => {

  app.post('/login', (req,res) => {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("xuxo");
      var query = { email: req.body.user, password: req.body.pass };
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
  
  app.post('/register', (req,res)=>{
    MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
      if (err) throw err;
      let lookQuery = {email: req.body.form.email}
      var dbo = db.db("xuxo");
      dbo.collection("Users").findOne(lookQuery, function(err, result) {
        if (err) throw err;
        if(result === null){
          var myobj = { 
            email: req.body.form.email,
            password: req.body.form.password 
          };
          dbo.collection("Users").insertOne(myobj, (err, res) => {
            if (err) throw err;
            console.log(`New user '${myobj.email}' has been created`);
          })
        }
        else{
          //En caso de que el usuario ya exista
          console.log(`ERROR: User '${lookQuery.email}' already exists`);
          res.status(404).send()
        }
        db.close();
      });
    })
  })

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
            dbo.collection("Users").insertOne(myobj, (err, res) => {
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

