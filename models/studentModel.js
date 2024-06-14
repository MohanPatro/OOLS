const { INTEGER, STRING } = require('sequelize') 
// const { INTEGER } = require('sequelize')
const sequelize=require('../helpers/sequelizedb')

const Student=sequelize.define('student',{
    studentId:{  //primary key
        type:INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    regId:{
        type:STRING,   //student Id Ex: S190571
        allowNull:false
    },
    studentName:{
        type:STRING
    },
    Department:{
        type:STRING    //puc,CSE,ECE,MECH,EEE,CIVIL,CE,MME
    },
    year:{
        type:STRING   //P1,p2,E1,E2,E3,E4
    },
    email:{
        type:STRING   //s190571@rguktsklm.ac.in
    },
    mobile:{
        type:STRING
    },
    isDeleted:{   //1-deleted 0-not deleted
        type:INTEGER,
        defaultValue:0

    },
    status:{
        type:INTEGER   //0- in college   1- outing  2-leave
    }
})

// Student.sync({alter:true});

module.exports=Student