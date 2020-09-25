const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  
    text: {
      type: String,
      min: 2,
      max: 10000,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    likes: {
      type: Number,
      min: 0
    }
  
});

module.exports = mongoose.model("Comment", CommentSchema);
