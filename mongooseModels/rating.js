const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
  movie_id: {
    type: String
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Rating", RatingSchema);


