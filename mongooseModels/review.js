const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
 
    movie_id: {
      type: String,
      required: true
    },
    text: {
      type: String,
      min: 2,
      max: 10000,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
      
    }],
    comments: [
      {
        text: {
          type: String,
          min: 2,
          max: 10000,
          required: true         
        },
        userWhoCommented: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        likes: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
          
        }]
      }
    ]
  
});

module.exports = mongoose.model("Review", ReviewSchema);
