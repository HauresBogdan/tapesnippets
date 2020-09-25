/*const express = require("express");
const router = express.Router();
const verifyToken = require("./verifyToken");
const Review = require("../mongooseModels/review");


router.post("/", verifyToken, async (req, res) => {
  const userID = req.whois._id;
  const movie_id = req.body.movie_id;
  const combinedLikeArrays = [];

  try {
    const findedReviews = await Review.find({ movie_id: movie_id });

   
    if (findedReviews != null) { 
        
        findedReviews.map(item => {
            
           combinedLikeArrays.push(item.likes);
          
        })
        
        res.send(combinedLikeArrays);
         
        } else {       
         res.send(`no suck movie_id`);       
      }
    } 
   catch (error) {
    console.error(error.message);
    res.status(500).send("Server error #7F");
  }  

});

module.exports = router;*/
