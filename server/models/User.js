const mongoose = require("mongoose");
const {Schema} = mongoose;

const UserSchema = new Schema({
    username : {
        type: String,
        required: true,     //Username is compulsary.
        unique: true,       //It should be unique i.e 2 users can't have same username.
    },
    email : {
        type: String,
        required: true,    //compulsary
        unique : true       //should be unique.
    },
    password: {
        type: String,
        required: true       //compulsary.
    }
}, 
{timestamps : true}   //Mongo will create createdAt and updatedAt .
)

module.exports = mongoose.model("User", UserSchema);
