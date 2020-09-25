const express = require("express");
const router = express.Router();
//const axios = require("axios").default;
//const verifyToken = require("./verifyToken");
const Review = require("../mongooseModels/review");

//we dont need midleware for verify token here cuz we want even unloged people to see the specific movie reviews
router.post("/",  async (req, res) => {
  //const userID = req.whois._id;
  const movieId = req.body.movieId;  

  
    
    //retrieve reviews for that movie from db
    try {
        const allReviewsForThisMovie = await Review.find({movie_id: movieId}).sort({_id:-1}).populate('user').populate("comments.userWhoCommented");
        res.status(200).send(allReviewsForThisMovie);

        
    
    } catch (err) {
        console.log(err.message);
        res.status(500).send('server error #2fjh');
    }
  

});

module.exports = router;
