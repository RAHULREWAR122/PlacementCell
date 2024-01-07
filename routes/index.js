const express = require('express');
const userController = require('./user')
const passport = require('passport');
const router = express.Router();


router.use('/' , userController);
// all student First Authenticated layers
router.use('/students' ,passport.checkAuthentication, require('./student'));

// all Interview First Authenticated layers
router.use('/interview' ,passport.checkAuthentication,  require('./interview'));



module.exports = router;