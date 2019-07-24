let MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectId;
let url = "mongodb+srv://admin:admin@cluster0-ytsob.mongodb.net/test?retryWrites=true&w=majority"
let cloudinary = require('cloudinary').v2 //
let formData = require('express-form-data') //

cloudinary.config({ 
  cloud_name: "xuxo", 
  api_key: "417796458458564", 
  api_secret: "8nGUS8B06aWajf9aRz4XAgdqX6A"
})

module.exports = (app) => {
  
  app.use(formData.parse())
  
  app.post('/image-upload', (req, res) => {
    
    console.log('Upload Images called')
    const values = Object.values(req.files)

    const promises = values.map(image => cloudinary.uploader.upload(image.path,
            function(error, result) {
                console.log(`${image.path} has been uploaded as ${result.url}`)
                res.json(result.url)
            }
        )
    )
    
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, *');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    
    Promise.all(promises)
  })

  app.post('/save-pet', (req,res) => {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
      if (err) throw err;
      console.log(req.body)
      var myobj = { 
        owner: req.body.user,
        petname: req.body.petName,
        age: req.body.petAge,
        race: req.body.petRace,
        certificate: req.body.petCertificate,
        contactphone:req.body.petEmergency,
        gender: req.body.petGender,
        inadoption: req.body.petAdopt,
        lost: req.body.petLost,
        found: req.body.petFound,
        inlove: req.body.petInLove,
        picture: req.body.petURL
      };
      var dbo = db.db("xuxo");
      dbo.collection("Pets").insertOne(myobj, (err, res) => {
        if (err) throw err;
        console.log(`New Pet '${myobj.petname}' has been created for '${myobj.owner}'`);
      })
      
      db.close();
     
    })
  })

  app.get('/lovers', (req, res)=>{
    // MongoClient.connect(url, { useNewUrlParser: true }, (err, db) =>{
    //     if (err) throw err;
    //     var dbo = db.db("xuxo");
        
    //     let lookQuery = {inlove: true}

    //     dbo.collection("Pets").find(lookQuery, function(err, result) {
    //       if (err) throw err;
    //       if(result === null){
    //         console.log(`ERROR: There´s no any dog which is looking for love`);
    //         res.status(404).send()
    //       }
    //       else{
    //         console.log('Dogs in Love found: ', result)
    //         res.json(result)
    //       }
    //       db.close();
    //   });
    // })
    MongoClient.connect(url, { useNewUrlParser: true }, (err, db) =>{
      if (err) throw err;
      var dbo = db.db("xuxo");
      dbo.collection("Pets").find({inlove: true}).toArray(function(err, result) {
        if (err) throw err;
        resultado=result.map(dog =>({"name":  dog.petname,
                                     "age": dog.age,
                                     "race": dog.race,
                                     "gender": dog.gender,
                                     "picture": dog.picture}))
        res.send(resultado)
        console.log('Dogs in Love found: ', resultado)
        db.close();
      });
    });
  })

}