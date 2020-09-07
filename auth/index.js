const express = require('express');
const mongoose = require('mongoose');
const app = express();



//connection to the mongoose db
mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
},()=> console.log("connected to db"));
//import routes 
const authRoutes = require('./routes/auth');


//Route middleware
app.use('./api/user',authRoutes)
app.listen(3000, ()=> console.log('Serving'));


//db connection
