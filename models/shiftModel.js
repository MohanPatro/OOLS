// ShiftID int [pk]
// ShiftName varchar
// DayOfWeek varchar
// StartTime time

// EndTime time
// isDeleted int

// const { INTEGER, STRING } = require('sequelize') 
const { INTEGER, STRING } = require('sequelize')
const sequelize=require('../helpers/sequelizedb')

const Shift=sequelize.define('shift',{
    shiftId:{  //primary key
        type:INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    shiftName:{
        type:STRING
    },
    dayOfWeek:{
        type:STRING   //s190571@rguktsklm.ac.in
    },
    startTime:{
        type:STRING
    },
    endTime:{
        type:STRING
    },
    password:{
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


// Shift.sync({alter:true})

module.exports=Shift