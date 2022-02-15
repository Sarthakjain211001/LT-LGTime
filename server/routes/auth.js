const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken')
const dotenv = require("dotenv");                     //dotenv file to store the secret keys
const verifyToken = require('../middleware/verifyToken');
dotenv.config();

const Jwt_sec = process.env.JWT_SECRET;                  //JWT secret to be used while creating JWT token.

//REGISTER : 

router.post('/signup', [                                              
    body('username', 'Enter a valid username').isLength({min : 3}),        //express validation for verifying the req body
    body('email', 'Enter a valid email').isEmail(),    
    body('password', 'Password must contain atleast 5 characters').isLength({min: 5})
],
async(req,res)=> {
    const errors = validationResult(req);                
    if(!errors.isEmpty()){                      //If error occured in express validation then return.
        return res.json({error : errors.errors[0].msg});
    }
    
    const{username, email, password} = req.body;           //taking username, email and password from the req body
    try{
        let user_byemail = await User.findOne({ email: email });             //finding user by email
        let user_byusername = await User.findOne({ username: username });    //finding user by username
        if(user_byemail || user_byusername){                             //if any is found then return error because both email and name should be unique
            return res.json({error : "Sorry, user already exists!"})
        }
        
        const salt = await bcrypt.genSalt(10);              //generating salt for hashing the password
        const secPass = await bcrypt.hash(password, salt);  //hashing the password
        const user = await User.create({                    //creatnig the user document
            username: username,
            email : email,
            password: secPass
        })
        
     
     const data = {                   //This data will be used to generate the json webtoken
         user:{
             id: user._id
         }
     }   
    
     const authToken = jwt.sign(data, Jwt_sec, {expiresIn:"3d"});         //generating the token and setting expiry for 3 days
     res.cookie('authToken', authToken, {               //storing the token in the cookie. So that user doesn't have to login again every time for 3 days.
         maxAge: 259200000, 
        //  httpOnly: true,
         sameSite: "none",
         secure : true
      });
     return res.status(201).json({authToken: authToken});
    }catch(err){
        res.json({error: err});
    }
})

//LOGIN: 
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must contain atleast 5 characters').isLength({min: 5})
], 
async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.json({error : errors.errors[0].msg});
    }
    const {email, password} = req.body;
    
    try{
        let user = await User.findOne({email : email})
        if(!user){
          return res.json({error : "User does not exists"})
        }
        
        const passwordCompare = await bcrypt.compare(password, user.password)         //checking the password 

        if (!passwordCompare) {                              
            return res.json({error : "Invalid Password" });
       }
        
       const data = {
            user: {
                 id: user.id
            }
       }
       const authToken = jwt.sign(data, Jwt_sec, {expiresIn:"3d"});   //generating authToken and storing it in cookie
       res.cookie('authToken', authToken, {
           maxAge: 259200000,
            // httpOnly: true,
            sameSite: "none",
            secure : true 
        });
       return res.status(200).json({authToken : authToken});
    }catch(err){
        res.json({error: err});
    }
    
}
)

//GET USER: 
router.get("/getUser", verifyToken ,async(req, res)=>{          //for getting the data of the logged in user
    const userId= req.user.id;                //verifyToken will atach the id in the req.
    
    try{
        const getUser = await User.findById(userId);
        if(getUser){
            return res.status(200).json({User : getUser});
        }
        else{
          return res.json({error : "User not found"});    
        }
    }catch(err){
        return res.json({error : "Some error occured"});
    }
  
  })
  
  //LOGOUT : 
  router.get("/logout", async(req,res)=>{
      try{
       res.clearCookie('authToken', {sameSite: "none", secure : true});   //clearing the cookie for logging out.
       return res.status(200).json("Logout success")
      }catch(err){
       return res.json({error : "Some error occured"})
  }
  })
  
module.exports = router