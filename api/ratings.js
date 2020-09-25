const express = require("express");
const router = express.Router();
//const verifyToken = require("./verifyToken");
const Ratings = require("../mongooseModels/rating");


//we dont need midleware for verify token here cuz we want even unloged in people to se the specific page
router.post("/", async (req, res) => {
  //const userID = req.whois._id;
  //get something
  const descending = req.body.descending;
  //const minCount = req.body.minCount===null ? 0 : req.body.minCount;
  const minCount = req.body.minCount;
  
  //console.log(typeof minCount);
  var desc = -1;

  //change here to 20 when you have more reviews
  const itemsperpage = 30;
  const page = (req.body.pagina-1) * itemsperpage ;



  if (descending == false) {
    const desc = -1;
  } else if (descending == true) {
    desc = 1;
  }

  try {
    const ratings = await Ratings.aggregate([
      {
        $group: {
          _id: "$movie_id",

          avgRating: { $avg: "$rating" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { avgRating: desc },
      },
      {
        $match: {
            count: { "$gte": minCount }
         }
      },      
      { "$skip"     : page },
      { "$limit"    : itemsperpage }
    ]);


    const pages = await Ratings.aggregate([
      {
        $group: {
          _id: "$movie_id",

          avgRating: { $avg: "$rating" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { avgRating: desc },
      },
      {
        $match: {
            count: { "$gte": minCount }
         }
      },
      
      {
        $count: "totalFields"
      }
    ]);

   
    res.send({ratings: ratings, pages: pages});
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error #vgf2");
  }
});

module.exports = router;
