const mongoose = require('mongoose')

const msgSchema = new mongoose.Schema(
    {
        messageContent: {
            type: String,
            required: true
        },
        sender:{
            type: mongoose.Types.ObjectId,
            required: true,
            ref:'user'
        },
        chatId:{
            type: mongoose.Types.ObjectId,
            required: true,
            ref:'chat'
        }
    },
    { timestamps: true }
)


const msgModel = mongoose.model('message', msgSchema);

module.exports = msgModel;