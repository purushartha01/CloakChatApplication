const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {

        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        isActivated:{
            type: Boolean,
            required:true,
            default:false
        }
    },
    {
        timestamps:true
    }
)

const userModel = mongoose.model('user', userSchema);


module.exports = userModel;