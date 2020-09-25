const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const verifyToken = require("./verifyToken");
const User = require("../mongooseModels/user");

router.get("/", verifyToken, async (req, res) => {
  const userID = req.whois._id;

  //find user and get his watchlist
  try {
    const findedUser = await User.findOne({ _id: userID });
    const hiswatchlist = findedUser.profile.watchlater;
    const finalResponse = [];
    const finalError = [];

    //now having his watchlist find eatch movie by mivieId (element here) from tmdb api

    if(hiswatchlist.length===0){
      res.status(200).json("empty");
    } else {


      hiswatchlist.forEach(element => {
        axios({
          method: "get",
          url: `https://api.themoviedb.org/3/movie/${element}?api_key=250ba5ba63e753134e500f38d9b8a4e6&language=en-US`
        })
          .then(response => {
            finalResponse.push(response.data);
            //if the foreach has made all the queries respond with the combined response
            if (finalResponse.length === hiswatchlist.length) {
              // console.log(finalResponse);
  
             
             
                res.status(200).json(finalResponse);
  
             
              
            }
          })
          .catch(error1 => {
            finalError.push(error1);
          });
      });
      
    }

    
  } catch (error2) {
    finalError.push(error2);
    console.log(finalError);
    res.status(500).send(finalError);
  }
});

module.exports = router;
