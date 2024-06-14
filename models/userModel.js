// const { INTEGER, STRING } = require('sequelize') 
const { INTEGER, STRING } = require('sequelize')
const sequelize=require('../helpers/sequelizedb')
const { string } = require('joi')

const User=sequelize.define('user',{
    userId:{  //primary key
        type:INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:STRING
    },
    email:{
        type:STRING   //s190571@rguktsklm.ac.in
    },
    mobile:{
        type:STRING
    },
    username:{
        type:STRING
    },
    password:{
        type:STRING
    },
    role:{
        type:STRING
    },
    profileImageName:{
        type:STRING
    },
    profileImageUrl:{
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

// User.sync({alter:true})


module.exports=User