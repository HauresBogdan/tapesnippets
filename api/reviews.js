const express = require('express');
const router = express.Router();
const verifyToken = require('./verifyToken');
const Review = require('../mongooseModels/review');

ObjectId = require('mongodb').ObjectID;



router.post('/', verifyToken, async(req, res) => {   

    const userID = req.whois._id;

    //change here to 20 when you have more reviews
    const itemsperpage = 3;
    const itemstoskip = (req.body.pagina-1) * itemsperpage ;
    var Reviewcounter = 0;
    //console.log(itemstoskip);
    try {
        const allReviews = await Review.find({user: userID });
        //find all reviews number for pagination
        //allReviews.map(item => item.text.map(item2 => Reviewcounter++));

        const pageReviews = await Review.find({user: userID }).sort({_id:-1}).skip(itemstoskip).limit(itemsperpage).populate("user").populate("comments.userWhoCommented").populate("likes").populate("comments.likes");


        //const pageReviews2 = await Review.aggregate([{ $match: {user: ObjectId(userID)}},{"$skip":itemstoskip},{"$limit":itemsperpage}]);
        //console.log(pageReviews2);

        res.send({allReviewsNumber : allReviews.length , pageReviews : pageReviews});
    
    } catch (err) {
        console.log(err.message);
        res.status(500).send('server error @reviews');
    }
   
});

module.exports = router;
