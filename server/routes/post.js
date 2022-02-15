const express = require('express');
const router = express.Router();
const Post = require('../models/Post')
const verifyToken = require('../middleware/verifyToken');


//CREATE :
router.post('/create', verifyToken ,async(req, res)=>{            //creating a post
   try{ 
    const user_Id = req.user.id;
    const{user, text, img, location} = req.body;
    
    if(user._id != user_Id){      //A user can upload a post by only his name. i.e Rahul can't create a post consisting of Ram's Id and name.
        return res.json({error: "Access not allowed"});
    }
    
    if(!text && !img){        //User should not be able to upload an empty post.
        return res.json({error: "Post can't be empty"});  
    }

    const newPost = await Post.create({
        user: user,
        text: text,
        img: img,
        location: location
    })

    return res.status(201).json({post: newPost});
   }catch(err){
       res.json({error: err});
   }

})

//FETCH: 
router.get("/fetchPosts", verifyToken, async(req,res)=>{   //fetching all the posts.
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
      res.json(err)
    }
     
})

module.exports = router;