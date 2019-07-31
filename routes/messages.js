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
            mascota: req.body.mascota,
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

  app.post('/get-messages', (req,res)=>{
    MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
      if (err) throw err;
      var dbo = db.db("xuxo");
      var myPostedMessages = {
        remitente : req.body.email
      };
      var myReceivedMessages = {
        destinatario : req.body.email
      }
      dbo.collection("Messages").aggregate([
        {$match: {$or: [ myPostedMessages, myReceivedMessages ] }},
        {
          $lookup:
            {
              from: "Pets",
              localField: "mascota",
              foreignField: "petname",
              as: "pet_info"
            }
        },
        {$unwind: "$pet_info"}
      ]).toArray(function(err, result) {
          if (err) throw err;
          resultado=result.map(message =>({"remitente": message.remitente,
                                    "destinatario": message.destinatario,
                                    "mensaje": message.mensaje,
                                    "mascota": message.mascota,
                                    "picture": message.pet_info.picture}))
          res.send(resultado)
          console.log('Informacion de mensajes encontrada con exito')
          db.close();
      })
    })
  })
}