const express = require('express')
const app = express()
let bodyParser = require('body-parser');
const port = 3001


const some = require('./routes/index')
var cors = require('cors')

app.use(cors());

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


app.listen(port, ()=>{
    console.log("Server online");
    
})