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
                
                if(key==='facebook'){
                  user.profile[key]= `https://www.facebook.com/${userBio[key]}`;  
                } else if(key==='youtube')
                {
                  user.profile[key]= `https://www.youtube.com/${userBio[key]}`;  
                }             
                else if(key==='goodreads')
                {
                  user.profile[key]= `https://www.goodreads.com/user/show/${userBio[key]}`;  
                } 
                else if(key==='twitter')
                {
                  user.profile[key]= `https://twitter.com/${userBio[key]}`;  
                } 
                else if (key==='linkedin')
                {
                  user.profile[key]= `https://www.linkedin.com/in/${userBio[key]}`;  
                }   
                else if (key==='instagram')
                {
                  user.profile[key]= `https://www.instagram.com/${userBio[key]}`;  
                }       

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
