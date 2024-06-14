const services=require('../services/studentServices')

const ApiResponse=require('../utils/ApiResponse')

const sequelize=require('../helpers/sequelizedb')

const common =require('../helpers/common')


exports.saveStudent = async (req, res) => {
    // Transection for each pr line item and pr
    const transaction = await sequelize.transaction();
    let isTransactionCommit = false;
    try {
     
        const userData=req.body;

    if(req.file)
    {
        userData.profileImageName=req.file.key

        userData.profileImageUrl=req.file.location
    }

    //check weather the user Name or the email already exists or not
    let where_cls={
        email:userData.email
    }
    let isUserExists=await services.existsData(where_cls)
    console.log(isUserExists)
  
    if(isUserExists==true)
    {
        return ApiResponse.entityAlreadyExists(res,"User Already Exists")
    }
  
    let savedUser=await services.saveStudent(userData,transaction)
  
        await transaction.commit();
        isTransactionCommit = true;
      return ApiResponse.saveResponse(res,{savedUser});
    } catch (error) {
      if (!isTransactionCommit) {
        await transaction.rollback();
      }
    //   await logmodel.Insert({ data: req.body, stack: error.stack }, error);
      return common.handleServererror(res, error);
    }
  };


  
  exports.getAllUsers= async (req, res) => {

    try {

        let usersData=await services.getAllStudents();
    
      return ApiResponse.sendDataResponse(res,{usersData});
    } catch (error) {
    //   await logmodel.Insert({ data: req.body, stack: error.stack }, error);
      return common.handleServererror(res, error);
    }
  };



  exports.getUserById= async (req, res) => {

    try {

        let userId=req.params.studentId
        let usersData=await services.getStudentById(userId);
    
      return ApiResponse.sendDataResponse(res,{usersData});
    } catch (error) {
    //   await logmodel.Insert({ data: req.body, stack: error.stack }, error);
      return common.handleServererror(res, error);
    }
  };




  exports.updateUser = async (req, res) => {

    try {
        
        const userUpdatedData=req.body;

        let userId=req.params.studentId

    if(req.file)
    {
        userUpdatedData.profileImageName=req.file.key

        userUpdatedData.profileImageUrl=req.file.location
    }

    //check weather the user Name or the email already exists or not
    let where_cls={
        email:userUpdatedData.email,
    }
    let isUserExists=await services.existsData(where_cls)
    console.log(isUserExists)
  
    if(isUserExists==true)
    {
        return ApiResponse.entityAlreadyExists(res,"User Already Exists with the email you have given")
    }
  
    let updatedUser=await services.updateStudentByStudentId(userId,userUpdatedData)

      return ApiResponse.updateResponse(res,{updatedUser});
    } catch (error) {
     
    //   await logmodel.Insert({ data: req.body, stack: error.stack }, error);
      return common.handleServererror(res, error);
    
    }
  };



  