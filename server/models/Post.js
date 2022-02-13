const mongoose = require('mongoose');
const {Schema} = mongoose;

const PostSchema = new Schema({
    user:{           
      type: Object,
      required: true,
    },
    text : {
        type: String,
    },
    img : {
        type: String,
    },
    location: {
        type: Object,
        required: true,
    }
}, 
{timestamps : true}   //Mongo will create createdAt and updatedAt .
)

module.exports = mongoose.model("Post", PostSchema);
