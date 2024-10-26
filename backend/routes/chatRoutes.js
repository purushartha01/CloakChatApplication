const express=require('express');
const { route } = require('./authRoutes');
const auth = require('../middlewares/auth');
const { getChats, searchUser, createUserChat, getCurrChat } = require('../controllers/chatController');

const router=express.Router();


router.route('/get')
.post(auth,getCurrChat)

router.route('/create')
.post(auth,createUserChat)


router.route('/search')
.get(auth,searchUser)

router.route('/all')
.get(auth,getChats)

module.exports=router;