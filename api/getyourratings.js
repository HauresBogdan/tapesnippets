const express = require("express");
const router = express.Router();
const verifyToken = require("./verifyToken");
const Rating = require("../mongooseModels/rating");


router.post("/", verifyToken, async (req, res) => {
  const userID = req.whois._id;
  var curentPageMoviesID = req.body.curentPageMoviesID;
  
  
  try {    
       
        const foundRating = await Rating.find({ movie_id: { $in: curentPageMoviesID}, user: {_id : userID}}).populate('user');  

        const foundRatings = foundRating.map(item =>  ({'_id': item.movie_id, 'avgRating': item.rating }))

   res.send(foundRatings);  
  } catch (error) {

    console.log(error.message);
    res.status(500).send("Server error @getyourratings");
  }
});

module.exports = router;
