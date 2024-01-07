const express = require('express');
const passport = require('passport');
const userController = require('../controllers/userController')
const dashboardController = require('../controllers/dashboardController')


const router = express.Router();

// 
// no need to  Authenticated for sign-In , sign-Up
router.get('/' , userController.signIn);
router.get('/signUp' , userController.signUp);


// all requeste First Authenticated
router.post('/create' ,userController.create);
router.post('/createSession' ,passport.authenticate('local' , {failureRedirect : '/'}) ,userController.createSession);
router.get('/dashboard',passport.checkAuthentication  ,dashboardController.dashboard)
router.get('/profile' ,passport.checkAuthentication ,userController.profile)
router.get('/signOut' , passport.checkAuthentication ,userController.signOut);
router.post('/updateProfile/:id',passport.checkAuthentication, userController.updateProfile);

module.exports = router;