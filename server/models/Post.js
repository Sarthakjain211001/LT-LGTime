const mongoose = require('mongoose');
const {Schema} = mongoose;

const PostSchema = new Schema({
    user:{                   //user who will create the post
      type: Object,
      required: true,
    },
    text : {                       //text of the post
        type: String,
    },
    img : {                     //image of the post
        type: String,
    },
    location: {               //location from where the post is uploaded
        type: Object,
        required: true,
    }
}, 
{timestamps : true}   //Mongo will create createdAt and updatedAt .
)

module.exports = mongoose.model("Post", PostSchema);
