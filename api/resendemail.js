const express = require("express");
const router = express.Router();
const verifyToken = require("./verifyToken");
const sendmail = require("./sendemailconfirmation");
const User = require("../mongooseModels/user");
const jwt = require('jsonwebtoken');

router.get("/", verifyToken, async (req,res)  => {
    const userId = req.whois._id;

    try {
        const findedUser = await User.findOne({ _id: userId });
          

        if(findedUser) {
            const token = jwt.sign({ email: findedUser.email}, process.env.TOKEN_SECRET);
            sendmail(token,findedUser.email); 
           
            res.send("mail has been send!");

        } else {
            res.send("user not found");
        }

        
        
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error @resendemail");
    }

});

module.exports = router;