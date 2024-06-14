// Table LeaveApplication {
//     LeaveID int [pk]
//     StudentID int [ref: > Student.StudentID]
//     LeaveType varchar
//     Reason varchar
//     Status varchar // Values: Pending, Approved, Rejected
//     AppliedDateTime datetime
//     ApprovalDateTime datetime
//     ApprovedBy int [ref: > Admin.AdminID]
//     isDeleted int
  
//   }
  

// const { INTEGER, STRING } = require('sequelize') 
const {DataTypes} = require('sequelize')
const sequelize=require('../helpers/sequelizedb')


const Application=sequelize.define('application',{
    applicationId:{  //primary key
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    applictaionType:{
        type:DataTypes.STRING   
    },
    reason:{
        type:DataTypes.STRING
    },
    appliedDateTime:{
        type:DataTypes.STRING
    },
    ApprovalDateTime:{
        type:DataTypes.STRING
    },
    isDeleted:{   //1-deleted 0-not deleted
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    status:{
        type:DataTypes.INTEGER   //0- in college   1- outing  2-leave
    }
})


// Application.sync({alter:true});

module.exports=Application;