const { Sequelize } = require("sequelize");
// const logmodel = require("../models/log-model");

if (process.env.NODE_ENV === 'production') {
    if (process.env.SERVER === 'P') {
        var conobj = {
            host: process.env.DB_HOST,
            username: process.env.USER_NAME,
            password: process.env.PASSWORD,
            database: process.env.DB,
            charset: process.env.CHARSET,
            dialect: "mysql",
        };
    } else {
        var conobj = {
            host: process.env.DB_HOST,
            username: process.env.USER_NAME,
            password: process.env.PASSWORD,
            database: process.env.DEV_DB,
            charset: process.env.CHARSET,
            dialect: "mysql",
        };
    }

} else {
    console.log('lcl db sequelize', process.env.USER_NAME)
    var conobj = {
        host: "localhost",
        username: "root",
        port: 3306,
        password: process.env.DB_PASSWORD_LOCAL,
        database: "ools_dev",
        dialect: "mysql",
    }
}

const sequelize = new Sequelize(conobj);

try {
    sequelize.authenticate();
    console.log("Connection Has Been Established Successfully.");
} catch (error) {
    logmodel.Insert({}, error);
    console.error("Unable To Connect To The Database:", error);
}

module.exports = sequelize;
