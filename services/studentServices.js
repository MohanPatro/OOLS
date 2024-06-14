const studentModel=require('../models/studentModel');
const Messages=require('../utils/messages')


exports.existsData=async (filter)=>{
    try{
        const userData= await studentModel.findOne({
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


exports.saveStudent=async (student,transaction)=>{
    try{
        const userData= await studentModel.create(student,{transaction})
        return userData;
    }
    catch(err)
    {
        await logModel.Insert({ filter, stack: error.stack }, error);
        throw new Error(Messages.UnableToSaveEntity);
    }
    
}


exports.getAllStudents=async (filter)=>{
    try{
        const usersData= await studentModel.findAll({
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



exports.getStudentById=async (studentId)=>{
    try{
        const userData= await studentModel.findOne({
            where:{
                studentId:studentId,
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



exports.updateStudentByStudentId=async (studentId,updatedData)=>{
    try{
        const userData= await studentModel.findOne({
            where:{
                studentId:studentId,
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