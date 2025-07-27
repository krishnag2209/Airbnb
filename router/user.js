const express = require('express');
const router = express.Router({mergeParams: true});
const User = require('../model/User.js');
const UserController = require('../Controller/Users.js');
const {saveRedirectUrl}   = require('../Middlewear.js');
const passport = require('passport');

// router.use(saveRedirectUrl);

// Sign up route
router
.route('/signup')
.get(UserController.Signup)
.post((UserController.PostSignup));



// Login route
router
.route('/login')
.get(UserController.Loginroute)
.post(saveRedirectUrl,
     passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true,
}), (UserController.PostLogin));


// Logout route
router.get('/logout',(UserController.Logoutroute));

module.exports = router;
