const express=require("express")

const router=express.Router()
const common=require('../helpers/common')
const studentControllers=require('../controllers/studentController')
const Validation=require('../validations/validations');



router.post(
    "/saveStudent",
    // common.validateToken(),
    Validation.validateFieldsCommon(
        "name",
        "email",
        "mobile",
        "username",
        "password",
      ),
    studentControllers.saveStudent
    );
router.get('/getAllStudents',studentControllers.getAllUsers)
router.post("/updateStudent/:studentId",studentControllers.updateUser)
router.delete('/deleteStudent/:studentId',studentControllers.deleteUser)


module.exports=router;