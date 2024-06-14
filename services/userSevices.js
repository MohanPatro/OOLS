const usermodel=require('../models/userModel');
const Messages=require('../utils/messages')


exports.existsData=async (filter)=>{
    try{
        const userData= await usermodel.findOne({
            where:{
                ...filter,
                isDeleted:0
            }
        })
        if(userData)
        {
            return true;
        }
        else{
            return false;
        }
    }
    catch(err)
    {
        await logModel.Insert({ filter, stack: error.stack }, error);
        throw new Error(Messages.UnableToGetEntity);
    }
    
}


exports.saveUser=async (user,transaction)=>{
    try{
        const userData= await usermodel.create(user,{transaction})
        return userData;
    }
    catch(err)
    {
        await logModel.Insert({ filter, stack: error.stack }, error);
        throw new Error(Messages.UnableToSaveEntity);
    }
    
}


exports.getAllUsers=async (filter)=>{
    try{
        const usersData= await usermodel.findAll({
            where:{
                isDeleted:0
            }
        });
        return usersData;

    }
    catch(err)
    {
        await logModel.Insert({ filter, stack: error.stack }, error);
        throw new Error(Messages.UnableToGetEntity);
    }
    
}



exports.getUserById=async (userId)=>{
    try{
        const userData= await usermodel.findOne({
            where:{
                userId:userId,
                isDeleted:0
            }
        });
        return userData;

    }
    catch(err)
    {
        await logModel.Insert({ filter, stack: error.stack }, error);
        throw new Error(Messages.UnableToGetEntity);
    }
    
}



exports.updateuserByUserId=async (userId,updatedData)=>{
    try{
        const userData= await usermodel.findOne({
            where:{
                userId:userId,
                isDeleted:0
            }
        });
        if(userData)
        {
            Object.assign(userData,updatedData);
            await userData.save();
            return userData;
        }
        else {
            throw new Error(Messages.UnableToGetEntityById);
        }

    }
    catch(err)
    {
        await logModel.Insert({ filter, stack: error.stack }, error);
        throw new Error(Messages.UnableToGetEntity);
    }
    
}