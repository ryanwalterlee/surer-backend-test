var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

var db = require("../../src/connection");

router.post("/", async function (req, res, next) {
  try {

    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    password = await bcrypt.hash(req.body.password, salt);

    // sql insert query
    let sql = `INSERT INTO user_information (email, password, first_name, last_name, contact_number) 
      VALUES ('${req.body.email}', '${password}', 
      '${req.body.firstName}', '${req.body.lastName}', '${req.body.contactNumber}')`;
    db.query(sql, (err, result) => {
      if (err) throw err;
    });

    const email = req.body.email;

    const user = { email: email };

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "3h",
    });
    return res.json({ accessToken: accessToken });
  } catch (err) {
    return res.status(400).send(err);
  }
});

module.exports = router;
