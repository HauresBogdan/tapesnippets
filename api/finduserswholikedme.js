const express = require("express");
const router = express.Router();
//const verifyToken = require("./verifyToken");
const User = require("../mongooseModels/user");
ObjectId = require('mongodb').ObjectID;


router.post("/",  async (req, res) => {
  //const userID = req.whois._id;
  const usersWholikedme = req.body.usersIds;


  const reformusersWholikedme = usersWholikedme.map(item => item && ObjectId(item));

  //console.log(reformusersWholikedme);
  
  
  try {    
       
        const foundUsers = await User.aggregate(
            [

              {$match : { _id: { $in: reformusersWholikedme}}}

            ]
         );

   res.send(foundUsers);   

  } catch (error) {
    
    console.error(error.message);
    res.status(500).send("Server error #7Fk");
  }
});

module.exports = router;
