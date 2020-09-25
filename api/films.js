const express = require("express");
const router = express.Router();
const axios = require("axios").default;

router.post("/", (req, res) => {
  axios
    .get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language=en-US&sort_by=${req.body.order}&include_adult=false&include_video=false&page=${req.body.pagina}&with_original_language=${req.body.limba}&year=${req.body.year}&primary_release_date.gte=${req.body.greater_than_release_date}&primary_release_date.lte=${req.body.lower_than_release_date}&vote_count.gte=${req.body.greater_than_rating_count}&vote_count.lte=${req.body.lower_than_rating_count}&vote_average.gte=${req.body.greater_than_rating}&vote_average.lte=${req.body.lower_than_rating}&with_genres=${req.body.with_genres}&without_genres=${req.body.without_genres}&without_keywords=583083`  
    )
    .then(response => {
      if (response.status === 200) return res.status(200).json(response.data);
      if (response.status === 401)
        return res.status(401).json(response.data.status_message);
      if (response.status === 404)
        return res.status(404).json(response.data.status_message);
    })
    .catch(err => {
      res.status(400).send(err);
      console.log(`error #mp1: ${err}`);
    });
});

module.exports = router;
