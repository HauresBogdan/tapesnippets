const express = require("express");
const router = express.Router();
const axios = require("axios").default;

router.post("/", (req, res) => {
  axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=${req.body.limba}sort_by=${req.body.order}&include_adult=false&include_video=false&page=${req.body.pagina}&year=${req.body.year}&query=${req.body.query}`
       
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
