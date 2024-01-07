const express = require('express');

const InterviewController = require('../controllers/interviewController');

const router = express.Router();

router.get('/addInterview' , InterviewController.addInterview);
router.post('/createInterview' , InterviewController.createInterview);
router.post('/enrollInInterview/:id', InterviewController.enrollInInterview);
router.get("/deallocate/:studentId/:interviewId",InterviewController.delete);


module.exports = router