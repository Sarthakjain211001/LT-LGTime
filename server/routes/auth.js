const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken')
// const cookie = require('cookie-parser')
const dotenv = require("dotenv");
// const verifyToken = require('../middleware/verifyToken');
dotenv.config();

const Jwt_sec = process.env.JWT_SECRET;

//REGISTER : 

router.post('/register', [
    body('username', 'Enter a valid username').isLength({min : 3}),
    body('email', 'Enter a valid email').isEmail(),    
    body('password', 'Password must contain atleast 5 characters').isLength({min: 5})
],
async(req,res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.json({error : errors.array()})
    }
    
    const{username, email, password} = req.body;
    try{
        let user_byemail = await User.findOne({ email: email });
        let user_byusername = await User.findOne({ username: username });
        if(user_byemail || user_byusername){
            return res.json({error : "Sorry, user already exists!"})
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);
        const user = await User.create({
            username: username,
            email : email,
            password: secPass
        })
        
     
     const data = {
         user:{
             id: user._id
         }
     }   
    
     const authToken = jwt.sign(data, Jwt_sec, {expiresIn:"3d"});
     res.cookie('authToken', authToken, {
         maxAge: 259200000, 
         httpOnly: true,
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
        return res.json({error: errors.array()})
    }
    const {email, password} = req.body;
    
    try{
        let user = await User.findOne({email : email})
        if(!user){
          return res.json({error : "User does not exists"})
        }
        
        const passwordCompare = await bcrypt.compare(password, user.password)

        if (!passwordCompare) {                              
            return res.json({error : "Wrong Credentials" });
       }
        
       const data = {
            user: {
                 id: user.id
            }
       }
       const authToken = jwt.sign(data, Jwt_sec, {expiresIn:"3d"});  
       res.cookie('authToken', authToken, {
           maxAge: 259200000,
            httpOnly: true,
            sameSite: "none",
            secure : true 
        });
       return res.status(200).json({authToken : authToken});
    }catch(err){
        res.json({error : err});
    }
    
}
)

module.exports = router