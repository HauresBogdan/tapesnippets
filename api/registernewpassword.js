const express = require("express");
const router = express.Router();
const User = require("../mongooseModels/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {newPassword2} = require('../validation');

router.post("/", async (req, res) => {
  const tokenWithEmailSigned = req.body.tokenWithEmailSigned;

  //extract info from jwt token
  const tokentranformedinobject = jwt.verify(
    tokenWithEmailSigned,
    process.env.TOKEN_SECRET
  );
  const email = tokentranformedinobject.email;
  const newPassword = req.body.newPassword;

   //validate data before registering newPass
   const {error} = await newPassword2({"password" : newPassword});
   if (error) 
       return res.status(201).send(error.details[0].message);

  try {
    const foundUser = await User.findOne({ email: email });
    //hash the password with 10 salts
    const hashedPassword = await bcrypt.hashSync(newPassword, 10);

    foundUser.password = hashedPassword;
    //save user
    const savedUser = await foundUser.save();
    res.status(200).send("password changed");
  } catch (error) {
    res.status(400).send(error);
    console.log("#10");
  }
});

module.exports = router;
