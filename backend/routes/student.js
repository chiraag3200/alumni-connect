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
      res.status(400).send("Email is required");
    }

    if(!password){
      res.status(400).send("Password is required");
    }

    Student.findOne({ email: email }, (err, student) => {
      if (!student) {
        return response.status(400).send({
          message: "Any student with this email does not exist."
        });
      }
      if ((bcrypt.compareSync(password, student.password))) {
        const token = jwt.sign({ student_id: student._id, email },
          process.env.TOKEN_KEY,
        );

        student.token = token;
        res.status(200).json(student);
      }
      res.status(400).send("Invalid Credentials");
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



router.route('/requests').get(auth, (req, res) => {

  const student_id = req.user.student_id;

  Request.find({ student_id: student_id}, (err, requests) => {
    if (err) {
      return res.status(400).send({
        message: err
      });
    }
    res.status(200).json(requests);
  });
});


module.exports = router;
