const mongoose=require('mongoose');


const {uri}=require('./../config/config.js');

module.exports=()=>{
    return mongoose.connect(uri);
}