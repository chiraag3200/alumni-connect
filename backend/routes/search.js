const router = require('express').Router();
let Alumni = require('../models/alumni.models');
const jwt = require("jsonwebtoken");
const auth = require("../resources/auth");


router.route('/searchEmployees/:company').get(auth, (req, res) => {

  const company = req.params.company.toLowerCase()

  Alumni.find({ employers: company}, (err, requests) => {
    if (err) {
      return res.status(400).send({
        message: err
      });
    }
    res.status(200).json(requests);
  });
});
