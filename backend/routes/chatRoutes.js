const express=require('express');
const { route } = require('./authRoutes');
const auth = require('../middlewares/auth');
const { getChats, searchUser, createUserChat, getCurrChat, getAllActiveChats, createGroup } = require('../controllers/chatController');

const router=express.Router();


router.route('/get')
.post(auth,getCurrChat)

router.route('/create')
.post(auth,createUserChat)


router.route('/search')
.get(auth,searchUser)

router.route('/all')
.get(auth,getChats)

router.route('/allCurrent')
.post(auth,getAllActiveChats)

router.route('/createGroup')
.post(auth,createGroup)

module.exports=router;