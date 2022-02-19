var express = require('express');
var router = express.Router();
var verifyJWT = require("./../../src/verifyJWT");

var db = require('../../src/connection');

router.get('/', verifyJWT, function(req, res, next) {
  try {
    let sql = `SELECT first_name, last_name, contact_number 
      FROM user_information 
      WHERE email = '${req.query.email}'`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result[0]);
    })
  } catch (err) {
    return res.status(400).send(err);
  }
  
});

module.exports = router;