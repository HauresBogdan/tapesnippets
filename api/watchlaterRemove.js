const express = require("express");
const router = express.Router();
const verifyToken = require("./verifyToken");
const User = require("../mongooseModels/user");
const { profile } = require("../validation");

router.post("/", verifyToken, async (req, res) => {
  const userID = req.whois._id;
  const movieId = req.body.movieId;

  //validate if the right type of data is given (string)
  const { error } = profile({ watchlater: movieId });
  if (error) return res.status(400).send(error.details[0].message);

  //find user and push movieId into a temp const that ulterior will be saved in db
  try {
    
    const savedUser = await User.updateOne({ _id: userID }, 
        {$pull: { "profile.watchlater" :  movieId }}, 
        {multi: true})
    
    
    res.send(`movie removed from watchlist`);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error #7F");
  }
});

module.exports = router;
