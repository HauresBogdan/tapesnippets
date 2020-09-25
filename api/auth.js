const express = require('express');
const router = express.Router();
const User = require('../mongooseModels/user');
const {register, login} = require('../validation');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
//const nodemailer = require('nodemailer');
const sendmail = require('./sendemailconfirmation');
require('dotenv').config();


//Authentification Route /api/auth
router.post('/register', async(req, res) => {


    //validate data before register
    const {error} = await register(req.body);
    if (error) 
        return res.status(400).send(error.details[0].message);
    
    //if email already in database respond with "email already registered"
    const exists = await User.findOne({email: req.body.email});
    if (exists) 
        return res.status(400).send("email already registered");


    //if name already in database respond with "name taken by someone else"
    const exists2 = await User.findOne({name: req.body.name});
    if (exists2) 
        return res.status(400).send("name taken by someone else");
    
    
    //hash the password with 10 salts
    const hashedPassword = await bcrypt.hashSync(req.body.password, 10);

    //get user gravatar
    const userGravatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
    });

    //we now data is valid and we save user to mongodb
    const user = new User({name: req.body.name, email: req.body.email, password: hashedPassword, avatar: userGravatar});

    try {
        //save user
        const savedUser = await user.save();
        res.send(`user with id: ${savedUser._id} created`);

        const token = jwt.sign({ email: req.body.email}, process.env.TOKEN_SECRET);
        sendmail(token,req.body.email);



    } catch (error) {
        res
            .status(400)
            .send(error);
            console.log("#10");
    }

});

//login route
router.post('/login', async(req, res) => {

    //validate data before login
    const {error} = login(req.body);
    if (error) 
        return res.status(400).send(error.details[0].message);
    
    //if email matches with one in database
    const userWithThatEmail = await User.findOne({email: req.body.email});
    if (!userWithThatEmail) 
        return res.status(400).send("email or password incorect");
    
    //now email exist and we chech password
    const corectLogin = await bcrypt.compare(req.body.password, userWithThatEmail.password);

    try {
        if (corectLogin) {

            //give a token to that good boy for his _id and sign it with a SECRET
            const token = jwt.sign({_id: userWithThatEmail._id}, process.env.TOKEN_SECRET);
            res.header('authToken',token);

            //send to api "Loged in as user name"
            res
                .status(200)
                .send({
                    username: userWithThatEmail.name,
                    gravatar: userWithThatEmail.avatar,
                    authToken: token
                });
                
        } else 
            return res
                .status(400)
                .send("password not correct");

        }
    catch (error) {
        res
            .status(400)
            .send(error);
    }

});

module.exports = router;