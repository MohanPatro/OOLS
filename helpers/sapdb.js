const express = require('express');
const router = express.Router();
const util = require('util');

module.exports = {
    getsapConnection
};
const oracledb = require('oracledb');
const dbuser_name = 'VNT_RFCUSR';
const dbpassword = 'c9qmy7';
const dbconnectString = '10.52.27.44:3601/KQ1'

async function getsapConnection() {
  console.log('call')
    if(process.env.NODE_ENV === 'production'){
      if(process.env.SERVER === 'P'){
        var conobj = {
          user: dbuser_name,
          password: dbpassword,
          connectString: dbconnectString
        };
      }else{
        var conobj = {
          user: dbuser_name,
          password: dbpassword,
          connectString: dbconnectString
        };
      }   
    // const con = mysql.createConnection(conobj);
    }else{
      // console.log('lcl db')
      var conobj = {
        user: dbuser_name,
        password: dbpassword,
        connectString: dbconnectString
      };
      // const con = mysql.createConnection(conobj);
    }
    console.log('Connection success. before ');
    const connection = await oracledb.getConnection(conobj);

    console.log('Connection success.');

    // Connection successful, perform database operations here

    // Close the connection when finished
    await connection.close();

    console.log('Connection closed.');
}