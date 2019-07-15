const express = require('express')
const app = express()
let bodyParser = require('body-parser');
const some = require('./routes/index')
var cors = require('cors')
const port = 3001

var corsOptions = {
//   credentials: true,
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
    origin: 'http://localhost:3000'
}
// app.options("*", cors({ 
//     corsOptions
//   }));

app.use(cors({ 
  corsOptions
}))

console.log(some)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// require('./routes/index')(app)
require('./routes/adoptions.js')(app)
require('./routes/founddogs.js')(app)
require('./routes/tinder.js')(app)
require('./routes/blog.js')(app)
require('./routes/users.js')(app)
require('./routes/dogs.js')(app)
require('./routes/pets.js')(app)



app.listen(port, ()=>{
    console.log("Server online");
    
})