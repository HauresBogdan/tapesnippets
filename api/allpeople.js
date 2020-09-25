const express = require("express");
const router = express.Router();
//const verifyToken = require("./verifyToken");
const User = require("../mongooseModels/user");


// no verify token midleeware here because we want even not logged in people to se our latest members
router.post("/", async (req, res) => {
  //const userID = req.whois._id;

  //change here to 20 when you have more people
  const itemsperpage = 3  ;
  const itemstoskip = (req.body.pagina - 1) * itemsperpage;
  
  try {
    const allUsers = await User.find({});

    const pageUsers = await User.find({})
      .sort({ _id: -1 })
      .skip(itemstoskip)
      .limit(itemsperpage);

      

    res.send({ allUsers: allUsers.length, pageUsers: pageUsers });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error @allpeople");
  }

  
});

module.exports = router;
