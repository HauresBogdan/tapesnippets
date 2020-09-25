const express = require("express");
const router = express.Router();
const verifyToken = require("./verifyToken");
const User = require("../mongooseModels/user");

router.post("/", verifyToken, async (req, res) => {
  const userBio = req.body.userBio;

  function checkProperties(obj) {
    for (var key in obj) {
      if (obj[key] !=="") return false;
    }
    return true;
  }

  
  try {
    const user = await User.findOne({ _id: req.whois._id });
    if (checkProperties(userBio) === true) {
      
      res.send(user);
    } else {
        for (var key in userBio) {
            if (userBio[key] !=="") 
            {
                //userBio[key] is the value                
                user.profile[key]= userBio[key];               

            }
        }        
        await user.save((err, updatedObj) => {
            if(err)
            {console.log("error",err)} else
            {res.send(updatedObj)}
          });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error @profile");
  }
});

module.exports = router;
