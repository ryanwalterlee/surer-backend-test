var express = require("express");
var jwt = require("jsonwebtoken");
require("dotenv").config();
var router = express.Router();

var db = require("../../src/connection");

// requires body to have userid and password

router.post("/", async function (req, res, next) {
  try {
    let sql = `SELECT password FROM user_information 
      WHERE email = '${req.body.email}'`;
    let password;

    const passwordObject = await db
      .promise()
      .query(sql)
      .then((result) => {
        const passwordObject = result[0];
        password = passwordObject[0].password;
        return passwordObject;
      })
      .catch((err) => {
        throw err;
      });
      
    const email = req.body.email;

    // userid does not exist
    if (passwordObject.length == 0) return res.status(403).send('email does not exist');

    // forbidden (wrong username or password)
    if (password !== req.body.password) return res.status(403).send("Wrong username or password");

    const user = { email: email };

    // add { expiresIn: '30m' } for expiration of token in 30 min
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3h' }); 
    res.json({accessToken: accessToken});

  } catch (err) {
    return res.status(400).send(err);
  }
});

module.exports = router;
