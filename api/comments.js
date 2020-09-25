const express = require('express');
const router = express.Router();
const verifyToken = require('./verifyToken');
const Review = require('../mongooseModels/review');
const User = require('../mongooseModels/user');


router.post('/', verifyToken, async(req, res) => {   

    const userID = req.whois._id;
    const comment = req.body.comment;   
    const reviewId = req.body.reviewId;   
    //const textIndex = req.body.textIndex;   

    try {
        const user = await User.findOne({ _id: userID });    

        if(user.confirmed===true) {

            const review = await Review.findOne({_id : reviewId}).populate("comments.userWhoCommented");

        //the index will asociate it with a review (one user can have manny reviews)
        review.comments.push( {   ...review.comments, "text" : comment, "userWhoCommented": {"_id" : userID } } );
        
        await review.save(()=>
         console.log("saved comment")
         );

        res.status(200).send("saved comment");

        } else {
            res.send("user unconfirmed");
        }


        
        
    
    } catch (err) {
        console.log(err);
        res.status(500).send('server error #7');
    }
   
});

module.exports = router;
