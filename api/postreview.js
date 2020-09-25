const express = require("express");
const router = express.Router();
const verifyToken = require("./verifyToken");
const User = require("../mongooseModels/user");
const Review = require("../mongooseModels/review");

router.post("/", verifyToken, async (req, res) => {
  const userID = req.whois._id;
  const movieId = req.body.movieId;
  const review = req.body.review;  

  //validate review to not have less than 4 words
  var values = req.body.review.split(' ').filter(function(v){return v!==''});
  if (values.length < 4) return res.send(`Review must have 4 or more words`);  

  try {
    const findedReview = await Review.findOne({ movie_id: movieId, user: userID });
    
    if (findedReview != null) {
      //if we find review
      res.send(`You already posted a review for this movie! (If you want to edit your review you will find it under Reviews section)`);
    } else {
      //if we don't find review
      const user = await User.findOne({ _id: userID });   
      if(user.confirmed === true) {
        const firstReview = new Review({movie_id: movieId, text: review, user: userID});      
        await firstReview.save();
        res.send(`Review added!`);

      } else {
        res.send(`Please log into your account to add a review`);
      }

      
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error #7F");
  }  
});

module.exports = router;
