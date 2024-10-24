const express=require('express');
const { getChats, postChat, searchUser, createUserChat } = require('../controllers/chatController');
const { route } = require('./authRoutes');
const auth = require('../middlewares/auth');

const router=express.Router();


router.route('/get')
.post(auth,postChat)

router.route('/create')
.post(auth,createUserChat)


router.route('/search')
.get(auth,searchUser)

router.route('/all')
.get(auth,getChats)





module.exports=router;