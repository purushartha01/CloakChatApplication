const userModel=require('./../models/userModel');

const createUser=async(userData)=>{
     const isCreated=await userModel.create(userData);
     return isCreated;
}

const getAllUsers=()=>{
    return userModel.find({});
}

const getAllUsersByEmail=(email)=>{
    return userModel.find({email});
}

const getUserById=(id)=>{
    return userModel.findById(id);
}

const getUserByEmail=(email)=>{
    return userModel.find({email:email});
}

const updateUserById=async(id,newUserData)=>{
    const isUpdated=await userModel.findByIdAndUpdate(id,newUserData);
    return isUpdated;
}

const deleteUserById=async(id)=>{
    const isDeleted=await userModel.FindByIdAndDelete(id);
}

module.exports={
    createUser,getAllUsers,getUserById,getUserByEmail,updateUserById,deleteUserById,getAllUsersByEmail
}