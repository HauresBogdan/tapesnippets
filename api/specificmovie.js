const express = require("express");
const router = express.Router();
const axios = require("axios").default;
//const verifyToken = require("./verifyToken");
const User = require("../mongooseModels/user");

//we dont need midleware for verify token here cuz we want even unloged in people to se the specific page
router.post("/", async (req, res) => {
  //const userID = req.whois._id;
  const movieId = req.body.movieId;  
  

  axios({
    method: "get",
    url: `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}&language=en-US`
  })
    .then(response => res.status(200).json(response.data))
    .catch(err => {
        console.log(err);
        res.status(500).send(err);
    });

  
});

module.exports = router;
