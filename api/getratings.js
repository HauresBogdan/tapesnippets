const express = require("express");
const router = express.Router();
//const verifyToken = require("./verifyToken");
const Rating = require("../mongooseModels/rating");


router.post("/",  async (req, res) => {
  //const userID = req.whois._id;
  var curentPageMoviesID = req.body.curentPageMoviesID;
  
  
  try {    
       
        const foundRating = await Rating.aggregate(
            [

              {$match : { movie_id: { $in: curentPageMoviesID}}},
             
              {
                
                $group:
                  {
                    _id: "$movie_id",
                    
                    avgRating: { $avg: "$rating" }
                  }
              }
            ]
         );

   res.send(foundRating);   

  } catch (error) {
    
    console.error(error.message);
    res.status(500).send("Server error #7Fk");
  }
});

module.exports = router;
