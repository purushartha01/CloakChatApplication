const express=require('express');
const { route } = require('./authRoutes');
const auth = require('../middlewares/auth');
const { sendMessage, allMessages } = require('../controllers/msgController');

const router=express.Router();


router.route('/new')
.post(auth,sendMessage)

router.route('/get')
.post(auth,allMessages)


module.exports=router;