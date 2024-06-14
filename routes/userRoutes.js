const express=require("express")

const router=express.Router()
const common=require('../helpers/common')
const userControllers=require('../controllers/userControllers')
const Validation=require('../validations/validations');


router.post(
    "/saveUser",
    // common.validateToken(),
    Validation.validateFieldsCommon(
        "name",
        "email",
        "mobile",
        "username",
        "password",
        "role",
      ),
    userControllers.saveUser
    );
router.get('/getAllUsers',userControllers.getAllUsers)
router.post("/updateUser/:userid",userControllers.updateUser)
router.delete('/deleteuser/:userId',userControllers.deleteUser)


module.exports=router;