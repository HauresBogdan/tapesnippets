const express = require("express");
const router = express.Router();
const verifyToken = require("./verifyToken");
const Rating = require("../mongooseModels/rating");
const User = require("../mongooseModels/user");


router.post("/", verifyToken, async (req, res) => {
  const userID = req.whois._id;
  const movieId = req.body.movieId;
  const rating = req.body.rating;  
  

  
  try {
    const foundRating = await Rating.findOne({ movie_id: movieId , user: {_id : userID}}).populate('user');   

    if(!foundRating) {
      const user = await User.findOne({ _id: userID });   

     if(user.confirmed === true) {
      const newRating = new Rating( {             
        movie_id: movieId ,
        rating: rating,
        user: {_id : userID}
    });

    await newRating.save((err, updatedObj) => {
        if(err)
        {console.log("error",err)} else
        {res.send("Success")}
      });
     } else if(user.confirmed === false) {

      res.send("Pls confirm your email adress before rating movies!");
     }

       


    }else {
        foundRating.rating = rating;        

        await foundRating.save((err, updatedObj) => {
            if(err)
            {console.log("error",err)} else
            {res.send("Success")}
          });

    }
       
           
  

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error #7Fk");
  }
});

module.exports = router;
