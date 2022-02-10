const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/users-controller'); 
const resetPassController = require('../controllers/reset_pass_controller');

router.get('/profile/:id',passport.checkAuthentication,userController.profile);
router.post('/update/:id',passport.checkAuthentication,userController.update);
router.get('/sign-in',userController.signIn);
router.get('/sign-up',userController.signUp);
router.post('/create-user',userController.createUser);

//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
),userController.createSession);

router.get('/sign-out',userController.destroySession);

//route given by passport, this is not the callback url, google will automatically recognize when request is coming from this
router.get('/auth/google',passport.authenticate('google',{scope: ['profile','email']}));

//callback url for google strategy
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect: '/users/sign-in'}),userController.createSession);

router.post('/reset_password',resetPassController.createResetLink);

router.get('/reset_password/',resetPassController.resetPassword);

router.post('/change_password/',resetPassController.changePassword);


module.exports = router; 