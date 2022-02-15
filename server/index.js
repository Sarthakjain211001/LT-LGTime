const express = require('express');   //importing express.
const app = express();             //creating the express app.
const PORT = 5000;
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');  //importing mongoose.

const dotenv = require('dotenv');  //using dotenv to hide the secret keys and db connection link.
dotenv.config();

const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');

mongoose.connect(process.env.MONGO_URL)      //connecting to the database.
.then(()=> console.log("DB Connection Successfull!"))
.catch((err)=>{
    console.log(err);
});

const cors  = require('cors');  //using cors to allow frontend to access the backend

app.use(express.json())  // To send the data in the form of json in get/post requests. 
                         // A middleware used to enable us to use req.body.

app.use((req, res, next) => {                  //setting the cors.
    // res.setHeader("Access-Control-Allow-Origin", "https://kind-bell-f2c270.netlify.app");

    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );

    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  });
  

app.use(cookieParser());       //usning cookie parser to store the cookie

app.use('/api/auth', authRoute);
app.use('/api/post', postRoute);

app.listen(PORT, ()=>{
    console.log(`server running on PORT ${PORT}`);
})