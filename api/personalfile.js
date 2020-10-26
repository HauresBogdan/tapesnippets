const express = require('express');
const router = express.Router();
const User = require('../mongooseModels/user');
const Review = require('../mongooseModels/review');
const Rating = require('../mongooseModels/rating');


router.post('/', async(req, res) => {

   const persID = req.body.persID;
   const combined = {
       persFile: "",
       reviewsFile: [],
       ratingFile: []

   };

    try {
        const persFile = await User.findOne({_id: persID});
        const reviewsFile = await Review.find({user: persID}).sort({_id:-1});
        const ratingFile = await Rating.find({user: persID}).sort({_id:-1});

        combined.persFile = persFile;
        combined.reviewsFile = reviewsFile;
        combined.ratingFile = ratingFile;

        
        res.send(combined);
    
    } catch (error) {
        console.error(err.message);
        res.status(500).send('server error @personalfile');
    }
   
});

module.exports = router;