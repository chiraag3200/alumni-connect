const router = require('express').Router();
let Student = require('../models/student.models');
let Alumni = require('../models/alumni.models');
let Request = require('../models/request.models');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const auth = require("../resources/auth");

router.route('/').get((req, res) => {
  Student.find()
    .then(students => res.json(students))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/register').post((req, res) => {

  const {email, password} = req.body
  req.body.password = bcrypt.hashSync(req.body.password, 8);

  Student.findOne({email:email})
  .then(student=>{
    if(student){
      return res.status(400).send({
        message: "Student with this email already exists"
      });
    }
  })


  const newStudent = new Student(req.body);
  newStudent.save()
    .then(() => res.json('Student added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/login').post((req, res) => {
  try{
    const {email, password} = req.body

    if (!email){
      return res.status(400).send("Email is required");
    }

    if(!password){
      return res.status(400).send("Password is required");
    }

    Student.findOne({ email: email }, (err, student) => {
      if (!student) {
        return response.status(201).send({
          message: "Any student with this email does not exist."
        });
      }
      if ((bcrypt.compareSync(password, student.password))) {
        const token = jwt.sign({ student_id: student._id, email },
          process.env.TOKEN_KEY,
        );

        student.token = token;
        return res.status(200).json(student);
      }
      return res.status(204).send({
          message: "Invalid credentials"
        });
    });
  }
  catch (err) {
    console.log(err);
  }
})

router.route('/usertype').post((req, res) => {
  try{
    const {email} = req.body

    Student.findOne({ email: email }, (err, student) => {
      if (student) {
        console.log('yes')
        return res.status(400).send({
          message: "student."
        });
      }
      else{
        return res.status(200).send({
          message: "alumni."
        });
      }
    });
  }
  catch (err) {
    console.log(err);
  }
})



router.route('/requestMeet').post((req, res) => {

  var student_id = req.body.student_id;
  var alumni_id = req.body.id
  // const message = req.body.message;

  Request.findOne({ student_id: student_id, alumni_id:alumni_id, is_approved:false}, (err, request) => {
    if (request) {
      return res.status(400).send({
        message: "A request already exists."
      });
    }

    try {
      const request = new Request({
        student_id: student_id,
        alumni_id: alumni_id,
        // message: message,
      });
      request.save()
      .then(() => res.json('Request sent!'))
      .catch(err => res.status(400).json('Error: ' + err));
    }
    catch (err){
      res.status(400).send(err);
    }
  });
});



router.route('/requestReferral').post((req, res) => {

  var student_id = req.body.student_id;
  var alumni_id = req.body.id
  // const message = req.body.message;


  Request.findOne({ student_id: student_id, alumni_id:alumni_id, is_approved:false}, (err, request) => {
    if (request) {
      return res.status(400).send({
        message: "A request already exists."
      });
    }

    try {
      const request = new Request({
        student_id: student_id,
        alumni_id: alumni_id,
        // message: message,
      });
      request.save()
      .then(() => res.json('Request sent!'))
      .catch(err => res.status(400).json('Error: ' + err));
    }
    catch (err){
      res.status(400).send(err);
    }
  });
});



router.route('/requests').post((req, res) => {

  const student_id = req.body.id
  const is_approved = req.body.is_approved;


  Request.find({ student_id: student_id, is_approved:is_approved}, (err, requests) => {
    if (err) {
      return res.status(400).send({
        message: err
      });
    }
    res.status(200).json(requests.length);
  });
});


module.exports = router;
