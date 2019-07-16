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


}