var express = require('express')
var cors = require('cors')
var app = express()
const axios = require('axios');


require('dotenv').config()

// express stuff
app.use(cors());
app.use(express.static('./public'))
app.use(express.json());


app.get('/', async (req,res) => {
  
  res.send("hello from node")
})


app.listen(3000, function () {
  console.log('listening on port 3000')
})