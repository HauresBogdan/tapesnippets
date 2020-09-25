const express = require("express");
const router = express.Router();
const verifyToken = require("./verifyToken");
const User = require("../mongooseModels/user");
const Review = require("../mongooseModels/review");

router.post("/", verifyToken, async (req, res) => {
  const userID = req.whois._id;
  const reviews_id = req.body.reviews_id;
  const comment_id = req.body.comment_id;

  const user = await User.findOne({ _id: userID });
try {

  if (user.confirmed === true) {

    if (!comment_id) {
      const findedReview = await Review.findOne({ _id: reviews_id });
  
      if (findedReview != null) {
        if (findedReview.likes && !findedReview.likes.includes(userID)) {
          findedReview.likes && findedReview.likes.push(userID);
          await findedReview.save((err, updatedObj) => {
            if (err) {
              console.log("error", err);
            } else {
              res.send(updatedObj.likes);
            }
          });
        } else res.send("already liked");
      } else {
        res.send(`no such review_id`);
      }
    } else if (comment_id) {
      const findedReview = await Review.findOne({ _id: reviews_id });
  
      //if we find review add one like
      if (findedReview != null) {
        findedReview.comments &&
          (await findedReview.comments.map((comment) => {
            if (comment._id == comment_id) {
              if (comment.likes && !comment.likes.includes(userID)) {
                comment.likes && comment.likes.push(userID);
  
                findedReview.save((err, updatedObj) => {
                  if (err) {
                    console.log("error", err);
                  } else {
                    res.send(updatedObj.likes);
                  }
                });
              } else res.send("already liked");
            }
          }));
      } else {
        res.send(`no such review_id`);
      }
    }
  } else if (user.confirmed === false) {
    res.send(`Pls confirm your email before adding likes`);
  }

} catch (err) {
  console.log(err);
  res.status(500).send('server error @likes');
}
  

  
});

module.exports = router;
