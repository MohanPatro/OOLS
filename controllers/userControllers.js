const userServices=require('../services/userSevices')

const ApiResponse=require('../utils/ApiResponse')

const sequelize=require('../helpers/sequelizedb')

const common =require('../helpers/common')


exports.saveUser = async (req, res) => {
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
        email:userData.email,
        username:userData.username
    }
    let isUserExists=await userServices.existsData(where_cls)
    console.log(isUserExists)
  
    if(isUserExists==true)
    {
        return ApiResponse.entityAlreadyExists(res,"User Already Exists")
    }
  
    let savedUser=await userServices.saveUser(userData,transaction)
  
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

        let usersData=await userServices.getAllUsers();
    
      return ApiResponse.sendDataResponse(res,{usersData});
    } catch (error) {
    //   await logmodel.Insert({ data: req.body, stack: error.stack }, error);
      return common.handleServererror(res, error);
    }
  };



  exports.getUserById= async (req, res) => {

    try {

        let userId=req.params.userId
        let usersData=await userServices.getUserById(userId);
    
      return ApiResponse.sendDataResponse(res,{usersData});
    } catch (error) {
    //   await logmodel.Insert({ data: req.body, stack: error.stack }, error);
      return common.handleServererror(res, error);
    }
  };



  exports.updateUser = async (req, res) => {

    try {
        
        const userUpdatedData=req.body;

        let userId=req.params.userId

    if(req.file)
    {
        userUpdatedData.profileImageName=req.file.key

        userUpdatedData.profileImageUrl=req.file.location
    }

    //check weather the user Name or the email already exists or not
    let where_cls={
        email:userUpdatedData.email,
    }
    let isUserExists=await userServices.existsData(where_cls)
    console.log(isUserExists)
  
    if(isUserExists==true)
    {
        return ApiResponse.entityAlreadyExists(res,"User Already Exists with the email you have given")
    }
  
    let updatedUser=await userServices.updateuserByUserId(userId,userUpdatedData)

      return ApiResponse.updateResponse(res,{updatedUser});
    } catch (error) {
     
    //   await logmodel.Insert({ data: req.body, stack: error.stack }, error);
      return common.handleServererror(res, error);
    
    }
  };


