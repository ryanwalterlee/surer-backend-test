var express = require('express');
var router = express.Router();
var verifyJWT = require("./../../src/verifyJWT");

var db = require('../../src/connection');

router.get('/', verifyJWT, function(req, res, next) {
  try {
    let sql = `SELECT first_name, last_name, contact_number 
      FROM user_information 
      WHERE account_number = ${req.query.accountNumber}`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    })
  } catch (err) {
    return res.status(400).send(err);
  }
  
});

module.exports = router;