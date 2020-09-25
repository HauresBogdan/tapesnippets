const express = require('express');
const router = express.Router();
const verifyToken = require('./verifyToken');
const User = require('../mongooseModels/user');


router.get('/', verifyToken, async(req, res) => {

   
    try {
        const allUserInfo = await User.findOne({_id: req.whois._id});
        res.send(allUserInfo);
    
    } catch (error) {
        console.error(err.message);
        res.status(500).send('server error #2');
    }
   
});

module.exports = router;
