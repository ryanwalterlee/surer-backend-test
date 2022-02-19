var express = require("express");
var jwt = require("jsonwebtoken");
require("dotenv").config();
var router = express.Router();
const bcrypt = require("bcrypt");

var db = require("../../src/connection");

router.post("/", async function (req, res, next) {
  try {
    let sql = `SELECT password FROM user_information 
      WHERE email = '${req.body.email}'`;
    let password;

    // extracting hashed password from db
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
    const validPassword = await bcrypt.compare(req.body.password, password);
    if (!validPassword) return res.status(403).send("Wrong username or password");

    const user = { email: email };

    // add { expiresIn: '3h' } for expiration of token in 3h
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3h' }); 
    res.json({accessToken: accessToken});

  } catch (err) {
    return res.status(400).send(err);
  }
});

module.exports = router;
