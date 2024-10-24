const express=require('express');
const { loginPost, signupPost, getAuth } = require('../controllers/authControllers');

const router=express.Router();



//login route
router.route('/login')
.post(loginPost)


//signup route
router.route('/signup')
.post(signupPost)


//route to get current auth status
router.route('/auth')
.post(getAuth)


module.exports=router;