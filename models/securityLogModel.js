const sequelize=require('../helpers/sequelizedb');

const {DataTypes}=require('sequelize')
const Student=require('./studentModel')
const Security=require('./userModel');
const { PROXY_AUTHENTICATION_REQUIRED } = require('http-status-codes');


const SecurityLog= sequelize.define('securityLog',{
    securityLogId:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    outTime:{
        type:DataTypes.TIME
    },  
    inTime:{
        type:DataTypes.TIME
    },
    isDeleted:{
        type:DataTypes.INTEGER,
        defaultValue:0

    }

})


// Student.hasMany(SecurityLog,{foreignKey:'studentId'})

// Security.hasMany(SecurityLog,{
//     foreignKey:'userId',
//     as:'allowedOut'
// })

// Security.hasMany(SecurityLog,{
//     foreignKey:'userId',
//     as:'allowedIn'
// })


// SecurityLog.sync({alter:true})

module.exports=SecurityLog