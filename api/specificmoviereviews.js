const express = require("express");
const router = express.Router();
//const axios = require("axios").default;
//const verifyToken = require("./verifyToken");
const Review = require("../mongooseModels/review");

//we dont need midleware for verify token here cuz we want even unloged people to see the specific movie reviews
router.post("/",  async (req, res) => {
  //const userID = req.whois._id;
  const movieId = req.body.movieId;  
//change here to 20 when you have more reviews
const itemsperpage = 3;
const itemstoskip = (req.body.pagina-1) * itemsperpage ;
  
    
    //retrieve reviews for that movie from db
    try {
        //find all reviews number for pagination
        const allReviewsForThisMovie = await Review.find({movie_id: movieId});
       
        const pageReviews = await Review.find({movie_id: movieId}).sort({_id:-1}).skip(itemstoskip).limit(itemsperpage).populate("user").populate("comments.userWhoCommented");
        res.status(200).send({allReviewsNumber : allReviewsForThisMovie.length , pageReviews : pageReviews});
        

        
    
    } catch (err) {
        console.log(err.message);
        res.status(500).send('server error #2spmr');
    }
  

    

});

module.exports = router;
