const mongoose=require('mongoose')


const chatSchema=new mongoose.Schema(
    {
        chatname: {
            type:String,
            required:true
        },
        isGroup:{
            type: Boolean,
            required:true,
            default: false
        },
        members:[{
            type: mongoose.Types.ObjectId,
            required:true,
            ref:'user'
        }],
        messages:[{
            type: mongoose.Types.ObjectId,
            ref:'message'
        }],
        latestMsg:{
            type: mongoose.Types.ObjectId,
            ref: 'message'
        },
        chatAdmin:[{
            type: mongoose.Types.ObjectId,
            ref:'user'
        }]
    },
    {
        timestamps: true
    }
)


const chatModel=mongoose.model('chat',chatSchema)


module.exports=chatModel