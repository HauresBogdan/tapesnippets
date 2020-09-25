const express = require("express");
const router = express.Router();
const verifyToken = require("./verifyToken");
const Rating = require("../mongooseModels/rating");


router.post("/", verifyToken, async (req, res) => {
  const userID = req.whois._id;
  const movieId = req.body.movieId;
  
  
  try {    
       
    const foundRatings = await Rating.find({ movie_id: movieId }).populate('user');  

   res.send(foundRatings);   

  } catch (error) {
    
    console.error(error.message);
    res.status(500).send("Server error #7Fkg");
  }
});

module.exports = router;
