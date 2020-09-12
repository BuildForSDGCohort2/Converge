const express = require('express');
const app = express(); 
const mongoose = require('mongoose');
//import routes 
const authRoutes = require('./routes/auth');
//connection to the mongoose db
mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, () => console.log("connected to db"));

//Route middleware
app.use(express.json());
//api route
app.use("/api/user", authRoutes);

//port
app.listen(3000, ()=> console.log('Serving'));



