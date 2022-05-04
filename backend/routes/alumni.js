const router = require('express').Router();
let Alumni = require('../models/alumni.models');
let Request = require('../models/request.models');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const auth = require("../resources/auth");

router.route('/').get((req, res) => {
  Alumni.find()
    .then(alumnis => res.json(alumnis))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/register').post((req, res) => {
  const {email, password} = req.body
  req.body.password = bcrypt.hashSync(req.body.password, 8);

  Alumni.findOne({email:email})
  .then(alumni=>{
    if(alumni){
      return res.status(400).send({
        message: "Alumni with this email already exists"
      });
    }
  })

  const newAlumni = new Alumni(req.body);
  newAlumni.save()
    .then(() => res.json('Alumni added!'))
    .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/login').post((req, res) => {
  try{
    const {email, password} = req.body

    if (!email){
      res.status(400).send("Email is required");
    }

    if(!password){
      res.status(400).send("Password is required");
    }

    Alumni.findOne({ email: email }, (err, alumni) => {
      if (!alumni) {
        return res.status(201).send({
          message: "Any Alumni with this email does not exist."
        });
      }
      if ((bcrypt.compareSync(password, alumni.password))) {
        const token = jwt.sign({ alumni_id: alumni._id, email },
          process.env.TOKEN_KEY,
        );

        alumni.token = token;
        return res.status(200).json({data:alumni, status:200});
      }
      return res.status(204).send("Invalid Credentials");
    });
  }
  catch (err) {
    console.log(err);
  }
})


router.route('/requests').post((req, res) => {

  const alumni_id = req.body.id
  const is_approved = req.body.is_approved;


  Request.find({ alumni_id: alumni_id, is_approved:is_approved}, (err, requests) => {
    if (err) {
      return res.status(400).send({
        message: err
      });
    }
    return res.status(200).json(requests);
  });
});


router.route('/acceptRequest/:id').post((req, res) => {

  var request_id = req.params.id

  try{
    Request.updateOne({ _id: request_id },{$set: { is_approved: true }})
    res.status(200).json('Request updated');
  }
  catch (err){
    res.status(400).send(err)
  }
});



router.route('/acceptReferral').post((req, res) => {

  var student_id = req.body.id;
  var alumni_id = req.body.alumni_id

  Request.findOne({ "student_id": student_id, "alumni_id":alumni_id, "is_approved":false}, (err,response) => {
    console.log(response)
    try{
          response.is_approved = true
          response.save()
          res.status(200).json('Request accepted');
    }
    catch(err){
      res.status(400).json('Error');
    }
  })
})


router.route('/searchEmployees/:company').get( (req, res) => {

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

router.route('/searchEmployees').get( (req, res) => {

  Alumni.find({},(err, requests) => {
    if (err) {
      return res.status(400).send({
        message: err
      });
    }
    res.status(200).json(requests);
  });
});


router.route('/details/:id').get((req, res) => {

  const id = req.params.id
  Alumni.find({_id:id})
    .then(alumni => res.json(alumni))
    .catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;
