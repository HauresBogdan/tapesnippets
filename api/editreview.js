const express = require("express");
const router = express.Router();
const verifyToken = require("./verifyToken");
//const User = require("../mongooseModels/user");
const Review = require("../mongooseModels/review");

router.post("/", verifyToken, async (req, res) => {
  const userID = req.whois._id;
  const reviews_id = req.body.reviews_id;
  const newText = req.body.newText; 
 
  if (reviews_id && !newText) {
    try {
        const findedReview = await Review.findOne({ _id: reviews_id });
    
        if (findedReview) {
        
        res.json(findedReview.text);
        }
      } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error @edit-review");
      }

  } else if(reviews_id && newText){
    try {
        const findedReview = await Review.findOne({ _id: reviews_id });
    
        if (findedReview) {
            findedReview.text = newText;
        const  saved =  await findedReview.save();
        res.json(saved);
        }
      } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error @edit-review2");
      }

  }
  

 
});

module.exports = router;
