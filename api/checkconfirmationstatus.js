const express = require("express");
const router = express.Router();
const verifyToken = require("./verifyToken");
const User = require("../mongooseModels/user");

//here you can chef in the future is is pro or is patron
router.get("/", verifyToken, async (req,res)  => {
    const userId = req.whois._id;

    try {
        const findedUser = await User.findOne({ _id: userId });          

        if(findedUser) {
           findedUser.confirmed === true;
            res.send(findedUser.confirmed);

        } else {
            res.send("user not found");
        }       
        
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error @checkconfirmationstatus");
    }

});

module.exports = router;