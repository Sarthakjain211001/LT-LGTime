const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config();

const Jwt_sec = process.env.JWT_SECRET

//This middleware will be used to verify the authToken when any request will come.

const verifyToken = (req, res, next)=>{
    
    
    const token = req.cookies.authToken;   //we will store the auth token in cookies when the user logs in . 
                                           //So here we are accessing the cookies using req.cookies.authToken
    
    if(!token){                       //If token is not present then error will be thrown and req will not be sent.
        return res.json({error : "Token not available"});
    }
    try{
       const data = jwt.verify(token, Jwt_sec);               //verifying the JWT token
       req.user = data.user;                             //Attaching the user related to the token in the request.
       next();
    }catch(err){
        return res.json({error : "Some error occured"});
    }
}

module.exports = verifyToken;