
const util = require('util');
//fghj
module.exports = {
  getConnection
};

const mysql = require("mysql");

function getConnection() {
  if (process.env.NODE_ENV === 'production') {
    if (process.env.SERVER === 'P') {
      var conobj = {
        host: process.env.DB_HOST,
        user: process.env.USER_NAME,
        password: process.env.PASSWORD,
        database: process.env.DB,
        charset: process.env.CHARSET
      };
    } else {
      var conobj = {
        host: process.env.DB_HOST,
        user: process.env.USER_NAME,
        password: process.env.PASSWORD,
        database: process.env.DEV_DB,
        charset: process.env.CHARSET
      };
    }
    // const con = mysql.createConnection(conobj);
  } else {
    console.log('lcl db normal')
    var conobj = {
      host: "localhost",
      user: "root",
      password: "",
      database: "conqtvms_dev",
    }
    // const con = mysql.createConnection(conobj);
  }
  const con = mysql.createConnection(conobj);
  return {
    query(sql, args) {
      return util.promisify(con.query)
        .call(con, sql, args);
    },
    close() {
      return util.promisify(con.end).call(con);
    }
  };

}