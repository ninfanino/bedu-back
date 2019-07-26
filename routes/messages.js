let MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectId;
let url = "mongodb+srv://admin:admin@cluster0-ytsob.mongodb.net/test?retryWrites=true&w=majority"

module.exports = (app) => {
  app.post('/post-message', (req,res)=>{
      MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
          if (err) throw err;
          var dbo = db.db("xuxo");
          var myobj = {
            remitente : req.body.envia,
            like : req.body.like,
            mensaje : req.body.mensaje,
            destinatario : req.body.destinatario,
            fecha: req.body.fecha
          };
          dbo.collection("Messages").insertOne(myobj, (err, res) => {
            if (err) throw err;
            console.log("1 message posted", myobj);
            db.close();
          });
        });
        res.send({msg:"Tu mensaje ha sido enviado"})
  })
}