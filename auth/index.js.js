const express = require('express');
const app = exress;

//iimport routes 
const authRoutes = require('./routes/auth');


//Route middleware

app.use('./api/user',authRoutes)
app.listen(3000, ()=> console.log(Serving));
