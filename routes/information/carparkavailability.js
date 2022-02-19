var express = require('express');
var router = express.Router();
var verifyJWT = require("../../src/verifyJWT");
const axios = require('axios');

var db = require('../../src/connection');

router.get('/', verifyJWT, function(req, res, next) {
  try {
    // get required format for date
    const today = new Date();
    const date = today.toISOString().slice(0, 10);
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateString = date + 'T' + time; // sample: YYYY-MM-DDTHH:mm:ss

    console.log(dateString);

    axios.get(`https://api.data.gov.sg/v1/transport/carpark-availability?date_time=${dateString}`).then(resp => {
      console.log(resp.data);
      res.send(resp.data);
    })

  } catch (err) {
    return res.status(400).send(err);
  }
  
});

module.exports = router;