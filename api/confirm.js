const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require("../mongooseModels/user");

router.get("/:number", async (req, res) => {

//token that has object with email fild inside
const token = req.params.number;
const tokentranformedinobject = jwt.verify(token, process.env.TOKEN_SECRET);
const email = tokentranformedinobject.email;
 
try{
  const user = await User.findOne({email : email});

  if(user) {

    user.confirmed = true;
    await user.save((err, updatedObj) => {
      if(err)
      {console.log("error",err)} else
      {res.send("<h1 style='color:green;text-align:center;'>Your email has been confirmed!!!<h1><br/><h2 style='color:green;text-align:center;'>You can now rate movies, post reviews , like and comment</h2>");}
    });   

  } 
   
  
    
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error @confirmationemail");
  }
});

module.exports = router;