const express = require('express');
const router = express.Router();
const userController = require('../controller/user_controller');
const passport = require('passport');

router.get('/profile/:id',passport.checkAuthentication,userController.profile);
router.get('/signIn',userController.signIn);
router.get('/signUp',userController.signUp);
router.post('/create',userController.create);

router.get('/signOut',userController.destroySession);
router.get('/resetPage',userController.resetPage);
router.post('/resetPassword',userController.resetPassword);


router.post('/createSession',passport.authenticate('local',{
    failureRedirect:'/users/signIn'
}),userController.createSession);
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/signIn'}),userController.createSession);


module.exports = router;