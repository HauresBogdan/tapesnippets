const express = require("express");
const router = express.Router();
const verifyToken = require("./verifyToken");
const User = require("../mongooseModels/user");
const { profile } = require("../validation");

router.post("/", verifyToken, async (req, res) => {
  const userID = req.whois._id;
  const movieId = req.body.movieId;

  //validate data before saving to profile
  const { error } = profile({ watchlater: movieId });
  if (error) return res.status(400).send(error.details[0].message);

  //find user and push movieId into a temp const that ulterior will be savd in db
  try {
    const findedUser = await User.findOne({ _id: userID });

    //check is movieId already in finderUser.profile.watchlater
    const found = findedUser.profile.watchlater.find(item => item == movieId);

    //if already return msg
    if (found) return res.send(`movie already in your watchlist`);

    //if not already added
    findedUser.profile.watchlater.push(movieId);
    const savedUser = await findedUser.save();
    res.send(`movie added to the watchlist`);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error #7F");
  }
});

module.exports = router;
