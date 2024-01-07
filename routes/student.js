const express = require('express');
const passport = require('passport');
const studentController = require('../controllers/studentsController');

const router = express.Router();

router.get('/addStudents' ,studentController.addStudent);
router.post('/createStudent' , studentController.createStudent);
router.get('/delete/:id' , studentController.delete);
router.get('/editStudent/:id' , studentController.edit);
router.post('/updateStudent/:id' , studentController.updateStudent);


module.exports = router;
