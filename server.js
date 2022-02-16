var express = require('express')
var cors = require('cors')
var app = express()
const axios = require('axios');
const helmet = require("helmet");


// app.use(
//   helmet({
//     contentSecurityPolicy: false,
//     crossOriginResourcePolicy:"cross-origin",
//   })
// );


require('dotenv').config()

// express stuff
app.use(cors());
app.use(express.static((__dirname+'/public')));
app.use(express.json());

app.get("/clip-calcite", function(req,res) {
  console.log("accesssed")
})

app.listen(3000, function () {
  console.log('listening on port 3000')
})