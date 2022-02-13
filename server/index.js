const express = require('express');   //importing express.
const app = express();             //creating the express app.
const PORT = 5000;

const mongoose = require('mongoose');  //importing mongoose.

const dotenv = require('dotenv');  //using dotenv to hide the secret keys and db connection link.
dotenv.config();

const authRoute = require('./routes/auth');

mongoose.connect(process.env.MONGO_URL)      //connecting to the database.
.then(()=> console.log("DB Connection Successfull!"))
.catch((err)=>{
    console.log(err);
});

const cors  = require('cors');  //using cors to allow frontend to access the backend

app.use(express.json())  // To send the data in the form of json in get/post requests. 
                         // A middleware used to enable us to use req.body.

app.use(cors());
app.use('/api/auth', authRoute);

app.listen(PORT, ()=>{
    console.log(`server running on PORT ${PORT}`);
})