const express = require('express');
const router = express.Router();
const Review = require('../mongooseModels/review');

router.post('/',  async(req, res) => {   

    //const userID = req.whois._id;

    //change here to 20 when you have more reviews
    const itemsperpage = 3;
    const itemstoskip = (req.body.pagina-1) * itemsperpage ;
    
    try {
         //find all reviews number for pagination
        const allReviews = await Review.find({});    
        const pageReviews = await Review.find({}).sort({_id:-1}).skip(itemstoskip).limit(itemsperpage).populate("user").populate("comments.userWhoCommented").populate("likes").populate("comments.likes");

        res.send({allReviewsNumber : allReviews.length , pageReviews : pageReviews});
    
    } catch (err) {
        console.log(err.message);
        res.status(500).send('server error @allreviews');
    }
   
});

module.exports = router;
