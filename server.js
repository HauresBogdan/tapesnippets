const express = require('express');
const connectToDB = require('./connectToDB');

//require routes module
const auth = require('./api/auth');
const films = require('./api/films');
const allpeople = require('./api/allpeople');
const searchresults = require('./api/searchresults');
const comments = require('./api/comments');
const reviews = require('./api/reviews');
const allreviews = require('./api/allreviews');
const scraper = require('./api/scraper');
const postreview = require('./api/postreview');
const likes = require('./api/likes');
const deletereview = require('./api/deletereview');
const editreview = require('./api/editreview');
const watchlater = require('./api/watchlater');
const saverating = require('./api/saverating');
const getratings = require('./api/getratings');
const confirm = require('./api/confirm');
const getyourratings = require('./api/getyourratings');
const finduserswholikedme = require('./api/finduserswholikedme');
const ratings = require('./api/ratings');
const allratingsofcurrentmovie = require('./api/allratingsofcurrentmovie');
const specificmovie = require('./api/specificmovie');
const specificmoviereviews = require('./api/specificmoviereviews');
const retrieveuserbyid = require('./api/retrieveuserbyid');
const watchlaterRemove = require('./api/watchlaterRemove');
const watchlaterList = require('./api/watchlaterList');
const profile = require('./api/profile');
const resendemail = require('./api/resendemail');
const resendforgotpassword = require('./api/resendforgotpassword');
const checkconfirmationstatus = require('./api/checkconfirmationstatus');
const registernewpassword = require('./api/registernewpassword');
const cors = require('cors');
const path = require('path');

//init express
const app = express();

//connect Database
connectToDB();

//cors whitelist  
const whitelist = ['http://localhost:3000', 'http://localhost']
const corsOptions = {
  origin: function (origin, callback) {
    //i think 1 makes whitelist blacklist
    if (whitelist.indexOf(origin) !== 1) {
      callback(null, true)
    } else {
      console.log(origin);
      callback(new Error('Not allowed by CORS'));
      
    }
  }
}

//init express middleware for bodyparser
app.use(express.json({extended: false}));


//define routes
app.use('/',cors(corsOptions), auth);
app.use('/films',cors(corsOptions), films);
app.use('/confirm',cors(corsOptions), confirm);
app.use('/allpeople',cors(corsOptions), allpeople);
app.use('/scraper',cors(corsOptions), scraper);
app.use('/searchresults',cors(corsOptions), searchresults);
app.use('/watchlater',cors(corsOptions), watchlater);
app.use('/saverating',cors(corsOptions), saverating);
app.use('/finduserswholikedme',cors(corsOptions), finduserswholikedme);
app.use('/reviews',cors(corsOptions), reviews);
app.use('/allreviews',cors(corsOptions), allreviews);
app.use('/comments',cors(corsOptions), comments);
app.use('/getratings',cors(corsOptions), getratings);
app.use('/getyourratings',cors(corsOptions), getyourratings);
app.use('/ratings',cors(corsOptions), ratings);
app.use('/allratingsofcurrentmovie',cors(corsOptions), allratingsofcurrentmovie);
app.use('/postreview',cors(corsOptions), postreview);
app.use('/likes',cors(corsOptions), likes);
app.use('/deletereview',cors(corsOptions), deletereview);
app.use('/editreview',cors(corsOptions), editreview);
app.use('/specificmovie',cors(corsOptions), specificmovie);
app.use('/specificmoviereviews',cors(corsOptions), specificmoviereviews);
app.use('/retrieveuserbyid',cors(corsOptions), retrieveuserbyid);
app.use('/watchlaterRemove',cors(corsOptions), watchlaterRemove);
app.use('/watchlaterList',cors(corsOptions), watchlaterList);
app.use('/profile',cors(corsOptions), profile);
app.use('/resendemail',cors(corsOptions), resendemail);
app.use('/resendforgotpassword',cors(corsOptions), resendforgotpassword);
app.use('/checkconfirmationstatus',cors(corsOptions), checkconfirmationstatus);
app.use('/registernewpassword',cors(corsOptions), registernewpassword);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('FrontEnd/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'FrontEnd', 'build', 'index.html'));
  });
}




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on ${PORT}`));
