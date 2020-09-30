const express = require("express");
const router = express.Router();
//const verifyToken = require("./verifyToken");
const sendmailforgotpassword = require("./sendmailforgotpassword");
const jwt = require('jsonwebtoken');

router.post("/",  async (req,res)  => {
    //const userId = req.whois._id;
    const email = req.body.email;
    console.log(email);

    try {
            const token = jwt.sign({ email: email}, process.env.TOKEN_SECRET);            
            sendmailforgotpassword(token, email); 
            res.send("Email has been send!");  
    } catch (error) {
        console.log(error);
        res.status(500).send("Sending email failed try again later");
    }

});

module.exports = router;