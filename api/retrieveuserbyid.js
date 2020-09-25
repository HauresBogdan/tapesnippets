const express = require("express");
const router = express.Router();
//const axios = require("axios").default;
const verifyToken = require("./verifyToken");
const User= require("../mongooseModels/user");


router.post("/", verifyToken, async (req, res) => {
  //const userID = req.whois._id;
  const targetedUser = req.body.userId;  

  
try {
    const allUserInfo = await User.findOne({_id: targetedUser});
    res.send(allUserInfo);

} catch (error) {
    console.error(err.message);
    res.status(500).send('server error #2gjb');
}
    
  

});

module.exports = router;