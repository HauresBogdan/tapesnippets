const express = require("express");
const router = express.Router();
const verifyToken = require("./verifyToken");
//const User = require("../mongooseModels/user");
const Review = require("../mongooseModels/review");

router.post("/", verifyToken, async (req, res) => {
  const userID = req.whois._id;
  const reviews_id = req.body.reviews_id;
  //const position = parseInt(req.body.position);

  try {
    //const findedReview = await Review.findOne({ _id: reviews_id });

    //if (findedReview) {
    const removeResponse = await Review.deleteOne({ _id: reviews_id });
    //console.log("Number of documents removed:", removeResponse.deletedCount);
    // res.json({ "Number of documents removed": removeResponse.deletedCount });
    res.json(removeResponse.deletedCount);
    //}
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error #7fF");
  }

  /*try {
    const findedReview = await Review.findOne({ _id: reviews_id });

    if (position === 0 && findedReview.text.length === 1) {
      const removeResponse = await Review.deleteOne({ _id: reviews_id });
      console.log("Number of documents removed:", removeResponse.deletedCount);
      res.json({ "Number of documents removed": removeResponse.deletedCount });
    } else if (position > 0) {
      await Review.updateOne({ _id: reviews_id }, [
        {
          $set: {
            text: {
              $concatArrays: [
                { $slice: ["$text", position] },
                {
                  $slice: [
                    "$text",
                    { $add: [1, position] },
                    { $size: "$text" },
                  ],
                },
              ],
            },
          },
        },
      ]);

      await Review.updateOne({ _id: reviews_id }, [
        {
          $set: {
            likes: {
              $concatArrays: [
                { $slice: ["$likes", position] },
                {
                  $slice: [
                    "$likes",
                    { $add: [1, position] },
                    { $size: "$likes" },
                  ],
                },
              ],
            },
          },
        },
      ]);

      await Review.updateOne(
        { _id: reviews_id },
        { $pull:  { "comments": { "index": position } } }
      );

      res.json(1);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error #7fF");
  }*/
});

module.exports = router;
