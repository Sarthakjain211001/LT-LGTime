const express = require('express');
const router = express.Router();
const Post = require('../models/Post')
const { body, validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs');
// var jwt = require('jsonwebtoken')
// const cookie = require('cookie-parser')
// const dotenv = require("dotenv");
const verifyToken = require('../middleware/verifyToken');
// dotenv.config();

router.post('/create', verifyToken ,async(req, res)=>{
   try{ 
    const user_Id = req.user.id;
    const{user, text, img} = req.body;
    
    if(user._id != user_Id){      //A user can upload a post by only his name. i.e Rahul can't create a post consisting of Ram's Id and name.
        return res.json({error: "Access not allowed"});
    }
    
    if(!text && !img){        //User should not be able to upload an empty post.
        return res.json({error: "Post can't be empty"});  
    }

    const newPost = await Post.create({
        user: user,
        text: text,
        img: img
    })

    return res.status(201).json({post: newPost});
   }catch(err){
       res.json({error: err});
   }

})

module.exports = router;