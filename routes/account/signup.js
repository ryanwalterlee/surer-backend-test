var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");

var db = require("../../src/connection");

// requires a body with userid and password properties

router.post("/", function (req, res, next) {
  try {
    let sql = `INSERT INTO user_information (email, password) 
      VALUES ('${req.body.email}', '${req.body.password}')`;
    db.query(sql, (err, result) => {
      if (err) throw err;
    });
  
    const email = req.body.email;

    const user = { email: email };

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3h' }); 
    return res.json({accessToken: accessToken});

  } catch (err) {
    return res.status(400).send(err);
  }
});

module.exports = router;
