const base_response = require("./base-response").response;
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { getConnection } = require("../helpers/db");
const tablename = "forgot_password_token";
const usedStrings = new Set();
const ApiResponse = require("../utils/ApiResponse");
const { Op } = require("sequelize");
const moment = require("moment");
const { addMonths, endOfMonth, addDays } = require("date-fns");
const Messages = require("../utils/messages");

module.exports = {
  async datetime(type, datetime = "") {
    const moment = require("moment-timezone");
    const desiredTimeZone = "Asia/Bangkok";
    var formatted = moment().tz(desiredTimeZone);
    //const thailandTime = moment.tz(dt.format('Y-m-d H:M:S'), 'Asia/Bangkok');
    if (datetime) {
      formatted = moment.tz(datetime, desiredTimeZone);
    } else {
      formatted = moment().tz(desiredTimeZone);
    }
    if (type == "db") {
      formatted = formatted.format("YYYY-MM-DD HH:mm:ss");
    } else if (type == "show") {
      formatted = formatted.format("YYYY-MM-DD hh:mm:ss A");
    }

    // formatted = moment.tz(dt.format('YYYY-MM-DD HH:mm:ss'), 'Asia/Bangkok');
    return new Promise((resolve, reject) => {
      return resolve(formatted);
    });
  },

  // Encrypt JSON data
  async encryptData(data) {
    try {
      const password_key = "RPjzxZrP1y18zMU6sbP8FbPO6N1LLA";
      const key = crypto.scryptSync(password_key, "GfG", 24);
      //let key = '0a699848f097380d136e54449c511db035bfdfb75d5caf103a5ec0110a3e99e6';
      const iv = crypto.randomBytes(16); // Initialization vector
      const cipher = crypto.createCipheriv("aes-192-cbc", Buffer.from(key), iv);
      let encryptedData = cipher.update(JSON.stringify(data), "utf8", "hex");
      encryptedData += cipher.final("hex");
      return { iv: iv.toString("hex"), encryptedData };
    } catch (error) {
      throw error;
    }
  },

  // Decrypt JSON data
  async decryptData(encryptedData, iv) {
    try {
      const password_key = "RPjzxZrP1y18zMU6sbP8FbPO6N1LLA";
      const key = crypto.scryptSync(password_key, "GfG", 24);
      const decipher = crypto.createDecipheriv(
        "aes-192-cbc",
        Buffer.from(key),
        Buffer.from(iv, "hex")
      );
      let decryptedData = decipher.update(encryptedData, "hex", "utf8");
      decryptedData += decipher.final("utf8");
      return JSON.parse(decryptedData);
    } catch (error) {
      throw error;
    }
  },
  async passendep(password, type = "") {
    return new Promise((resolve, reject) => {
      const algorithm = "aes-192-cbc";
      const password_key = "RPjzxZrP1y18zMU6sbP8FbPO6N1LLg";
      const key = crypto.scryptSync(password_key, "GfG", 24);
      const iv = Buffer.alloc(16, 0);
      if (type == "en") {
        var cipher = crypto.createCipheriv(algorithm, key, iv);
      } else {
        var cipher = crypto.createDecipheriv(algorithm, key, iv);
      }

      let result_output = "";
      if (type == "en") {
        cipher.on("readable", () => {
          let chunk;
          while (null !== (chunk = cipher.read())) {
            result_output += chunk.toString("base64");
          }
        });
      } else {
        cipher.on("readable", () => {
          let chunk;
          while (null !== (chunk = cipher.read())) {
            result_output += chunk.toString("utf8");
          }
        });
      }

      // Handling end event
      cipher.on("end", () => {
        // console.log(result_output,'old');
        return resolve(result_output);
      });
      // Writing data
      if (type == "en") {
        cipher.write(password);
      } else {
        cipher.write(password, "base64");
      }
      cipher.end();
    });
  },

  async generatejwttoken(data, res) {
    const secret = process.env.JWT_SECRET;
    return new Promise((resolve, reject) => {
      jwt.sign(
        {
          login: data,
        },
        secret,
        { expiresIn: "30 days" },
        (err, token) => {
          if (err) {
            return resolve(
              res
                .status(200)
                .json(base_response(400, {}, "Token not generated"))
            );
          }
          return resolve(token);
        }
      );
    });
  },

  async validateToken(req, res, next) {
    try {
      // console.log(req)
      const secret = process.env.JWT_SECRET;
      const { authorization } = req.headers;
      const tokenArray = authorization.split(" ");
      jwt.verify(tokenArray[1], secret, (err, data) => {
        if (err) {
          res.status(403).json(base_response(403, {}, "Unauthorized"));
        } else {
          req.login = data.login;
          console.log(req.login);
          if (data.login) {
            next();
          } else {
            res.status(402).json(base_response(403, {}, "Please ReLogin"));
          }
        }
      });
    } catch (error) {
      res.status(402).json(base_response(403, {}, "Wrong Bearer Token"));
    }
  },

  // async validateQueryToken(req, res, next) {
  //   try {
  //     // console.log(req)
  //     const secret = process.env.JWT_SECRET;
  //     const { authorization } = req.query;
  //     const tokenArray = authorization.split(" ");
  //     jwt.verify(tokenArray[1], secret, (err, data) => {
  //       if (err) {
  //         res.status(403).json(base_response(403, {}, "Unauthorized"));
  //       } else {
  //         req.body.user_id = data.data.user_id;
  //         req.body.user_name = data.data.user_name;
  //         const checkkey = "login_type" in data.data;
  //         if (checkkey) {
  //           // console.log('key exits',data.data)
  //           req.body.login_type = data.data.login_type;
  //         } else {
  //           // console.log('The key does not exist.',data.data);
  //         }
  //         next();
  //       }
  //     });
  //   } catch (error) {
  //     res.status(402).json(base_response(403, {}, "Wrong Bearer Token"));
  //   }
  // },

  async CheckLoginType(data, login_tp, res) {
    // console.log(login_tp)
    const login_type = "login_type" in data;
    const wrong_message =
      "Wrong Bearer Token or token not valid for this service";
    let data_r = {
      data: data,
      login_tp: login_tp,
    };
    // console.log(login_type)

    return new Promise((resolve, reject) => {
      if (login_type) {
        if (Array.isArray(login_tp)) {
          var match_status = false;
          for (var i = 0; i < login_tp.length; i++) {
            if (data.login_type == login_tp[i]) {
              match_status = true;
              break;
            }
          }
          if (match_status == true) {
            return resolve(true);
          } else {
            res.status(402).json(base_response(403, data_r, wrong_message));
          }
        } else {
          if (data.login_type == login_tp) {
            return resolve(true);
          } else {
            res
              .status(402)
              .json(base_response(403, data_r, wrong_message + "."));
          }
        }
      } else {
        return resolve(true);
      }
    });
  },

  async configuremail() {
    nodemailer = require("nodemailer");
    let smtpAuth;
    smtpAuth = {
      user: "info@conqt.com",
      pass: "Conqt@123",
    };
    let smtpConfig = {
      host: "smtp.mail.us-east-1.awsapps.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: smtpAuth,
    };
    return new Promise((resolve, reject) => {
      let transporter = nodemailer.createTransport(smtpConfig);

      transporter.verify(function (error, success) {
        if (error) {
          ////console.log(error);
        } else {
          console.log("Server is ready to take our messages");
        }
      });
      return resolve(transporter);
    });
  },

  async sendMail(transporter, subject, template = "", email) {
    return new Promise((resolve, reject) => {
      transporter.sendMail(
        {
          from: {
            name: "ConQT",
            address: "info@conqt.com",
          },
          to: email,
          subject: subject,
          html: template ? template : `welcome to VMS`,
        },
        (err, info) => {
          if (err) {
            console.log(err);
            return resolve(err);
          } else {
            //console.log(info);
            return resolve(info);
          }
        }
      );
    });
  },

  // generate unique string
  async generateUniqueString(length) {
    return new Promise((resolve, reject) => {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let uniqueString = "";

      do {
        for (let i = 0; i < length; i++) {
          uniqueString += characters.charAt(
            Math.floor(Math.random() * characters.length)
          );
        }
      } while (usedStrings.has(uniqueString));

      usedStrings.add(uniqueString);
      resolve(uniqueString);
    });
  },

  //Reset Password functions

  async InsertOtpp(data) {
    const conn = getConnection();
    let sql = `INSERT INTO ${tablename} SET ?`;
    let result = await conn.query(sql, data).catch((err) => {
      if (err) {
        console.log(err);
        return false;
      }
    });
    return result;
  },

  async UpdateOtp(data, where_cls) {
    const conn = getConnection();
    try {
      let sql = `UPDATE ${tablename} SET ? WHERE ?`;
      var result = await conn.query(sql, [data, where_cls]);
      return result;
    } catch (err) {
      await logmodel.Insert(where_cls, err);
      return false;
    } finally {
      await conn.close();
    }
  },

  async InsertToken(data) {
    const conn = getConnection();
    let sql = `INSERT INTO ${tablename} SET ?`;
    let result = await conn.query(sql, data).catch((err) => {
      if (err) {
        console.log(err);
        return false;
      }
    });

    return result;
  },

  async checkUserOTpforgot(where_cls1, where_cls2) {
    const conn = getConnection();
    let sql = `SELECT * FROM ${tablename} where ? AND ? AND status=0 `;
    let result = await conn
      .query(sql, [where_cls1, where_cls2])
      .catch((err) => {
        if (err) {
          // console.log(err)
          return false;
        }
      });
    await conn.close();
    return result;
  },
  async checkUserReset(where_cls1) {
    const conn = getConnection();
    let sql = `SELECT * FROM ${tablename} where ? AND status=0 `;

    let result = await conn.query(sql, [where_cls1]).catch((err) => {
      if (err) {
        // console.log(err)
        return false;
      }
    });
    await conn.close();
    return result;
  },

  async checkUserForResend(where_cls1) {
    const conn = getConnection();
    let sql = `SELECT * FROM ${tablename} where ? AND status=0 ORDER BY id DESC LIMIT 1`;

    let result = await conn.query(sql, [where_cls1]).catch((err) => {
      if (err) {
        // console.log(err)
        return false;
      }
    });
    await conn.close();
    return result;
  },

  async checkVerifyOTpforgot(where_cls1, where_cls2) {
    const conn = getConnection();
    let sql = `SELECT * FROM ${tablename} where ? AND ? AND status=1 `;
    let result = await conn
      .query(sql, [where_cls1, where_cls2])
      .catch((err) => {
        if (err) {
          // console.log(err)
          return false;
        }
      });
    await conn.close();
    return result;
  },

  async Updateotpforgotpassword(data, where_cls1, where_cls2) {
    const conn = getConnection();
    let sql = `UPDATE ${tablename} SET ? WHERE ? AND ?`;
    let result = await conn
      .query(sql, [data, where_cls1, where_cls2])
      .catch((err) => {
        if (err) {
          console.log(err);
          return false;
        }
      });
    await conn.close();
    return result;
  },

  async error(res) {
    return new Promise((resolve, reject) => {
      res.status(402).json(base_response(403, {}, "Something went Wrong"));
    });
  },

  async serverError(res) {
    return new Promise((resolve, reject) => {
      res
        .status(500)
        .json(
          base_response(
            500,
            {},
            "Unable To Process The Request, Try After Some Time"
          )
        );
    });
  },

  async handleServererror(res, error) {
    if (error?.parent?.errno == "1452") {
      return ApiResponse.foreignKeyConstraintError(res);
    } else {
      return ApiResponse.serverIssueResponse(res, error);
    }
  },

  async getFilterObject(req, filterObj = {}) {
    filterObj.status = 1;
    // If User Is Not SuperAdmin Then Filter Data By Organization
    console.log(req.login);
    if (req.login.role != "SuperAdmin") {
      filterObj.organizationId = req.login.organizationId;
    }
    console.log(filterObj);
    return filterObj;
  },

  async generateRandomNumber(digits) {
    const min = 10 ** (digits - 1);
    const max = 10 ** digits - 1;
    return Math.floor(min + Math.random() * (max - min + 1));
  },

  async generateUniqueNo() {
    const currentDate = new Date();

    const year = String(currentDate.getFullYear()).slice(-2);
    const month = String(currentDate.getMonth() + 1);
    const day = String(currentDate.getDate());

    const timestamp = Date.now();
    const lastFourDigits = String(timestamp).slice(-4);

    return `${year}${month}${day}-${lastFourDigits}${await this.generateRandomNumber(
      3
    )}`;
  },

  async generateNextNumber(lastNumber) {
    let lastDigits = Number(lastNumber.slice(-3));
    console.log(lastDigits);

    if (lastDigits == 999) {
      let lastCap = lastNumber.charAt(3);
      if (lastCap == "Z") {
        let firstCap = lastNumber.charCodeAt(2);
        firstCap = String.fromCharCode(firstCap + 1);
        lastNumber = lastNumber.substring(0, 2) + firstCap + "A" + "001";
        return lastNumber;
      } else {
        let secondCap = lastNumber.charCodeAt(3);
        secondCap = String.fromCharCode(secondCap + 1);
        lastNumber = lastNumber.substring(0, 3) + secondCap + "001";
        return lastNumber;
      }
    } else {
      lastDigits = String(lastDigits + 1);
      if (lastDigits.length != 3) {
        lastDigits.length == 2
          ? (lastDigits = "0" + lastDigits)
          : (lastDigits = "00" + lastDigits);
      }
      lastNumber = lastNumber.substring(0, 4) + lastDigits;
      return lastNumber;
    }
  },

  async getSearchCondition(searchBy, searchFields, modelAttributes) {
    let searchConditions = {};

    if (searchBy !== "" && searchFields.length === 0) {
      searchConditions = {
        [Op.or]: modelAttributes.map((attribute) => ({
          [attribute]: { [Op.like]: `%${searchBy}%` },
        })),
      };
    } else if (searchBy !== "" && searchFields.length > 0) {
      searchFields = searchFields.filter((column) =>
        modelAttributes.includes(column)
      );
      searchConditions = {
        [Op.or]: searchFields.map((attribute) => ({
          [attribute]: { [Op.like]: `%${searchBy}%` },
        })),
      };
    }

    return searchConditions;
  },

  async getSearchConditionWithoutOr(searchBy, searchFields, modelAttributes) {
    let searchConditions = [];

    if (searchBy !== "" && searchFields.length === 0) {
      modelAttributes.forEach((attribute) => {
        const condition = { [attribute]: { [Op.like]: `%${searchBy}%` } };
        searchConditions.push(condition);
      });
    } else if (searchBy !== "" && searchFields.length > 0) {
      searchFields = searchFields.filter((column) =>
        modelAttributes.includes(column)
      );
      searchFields.forEach((attribute) => {
        const condition = { [attribute]: { [Op.like]: `%${searchBy}%` } };
        searchConditions.push(condition);
      });
    }

    return searchConditions;
  },

  async getInnerSearchConditions(
    searchBy,
    searchFields,
    innerAttributes,
    associationSearchConditions
  ) {
    if (searchFields.length == 0) {
      for (const [modelName, attributes] of Object.entries(innerAttributes)) {
        attributes.forEach((attribute) => {
          let condition = {};
          let key = `$${modelName}.${attribute}$`;
          condition[key] = { [Op.like]: `%${searchBy}%` };
          associationSearchConditions.push(condition);
        });
      }
    } else {
      for (const [modelName, attributes] of Object.entries(innerAttributes)) {
        attributes.forEach((attribute) => {
          if (searchFields.includes(attribute)) {
            let condition = {};
            let key = `$${modelName}.${attribute}$`;
            condition[key] = { [Op.like]: `%${searchBy}%` };
            associationSearchConditions.push(condition);
          }
        });
      }
    }
    console.log(associationSearchConditions);
    return associationSearchConditions;
  },

  async getFileNamesAndUrlsOfUploadedFiles(files) {
    let attachments = [];
    let attachmentsUrl = [];

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        attachments.push(files[i].key);
        attachmentsUrl.push(files[i].location);
      }
    }

    attachments = attachments.join(",");
    attachmentsUrl = attachmentsUrl.join(",");
    return { attachments, attachmentsUrl };
  },

  async getDateRangerFilter(filter, startDate, endDate) {
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    // if start date and end date  is valid
    if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
      startDate.setUTCHours(0, 0, 0, 0);
      endDate.setUTCHours(23, 59, 59, 999);
      filter.createdAt = {
        [Op.between]: [startDate, endDate],
      };
    }

    return filter;
  },
  async getDateRangerFilterWithColumnName(
    filter,
    startDate,
    endDate,
    ColumnName = "createdAt"
  ) {
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    // if start date and end date  is valid
    if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
      startDate.setUTCHours(0, 0, 0, 0);
      endDate.setUTCHours(23, 59, 59, 999);
      filter[ColumnName] = {
        [Op.between]: [startDate, endDate],
      };
    }

    return filter;
  },

  async getLastDateFromDates(dates) {
    if (dates.length == 0) {
      return null;
    }

    let lastDate = null;

    for (let date of dates) {
      // Check if the date is valid
      let currentDate = new Date(date);
      if (!isNaN(currentDate.getTime())) {
        // If lastDate is null or current date is greater than lastDate, update lastDate
        if (lastDate === null || currentDate > new Date(lastDate)) {
          lastDate = date;
        }
      }
    }

    if (lastDate !== null) {
      lastDate = new Date(lastDate).toDateString();
    }

    return lastDate;
  },

  async isValidDate(dateString) {
    return !isNaN(Date.parse(dateString));
  },

  async setStartDate(date) {
    let startDate = new Date(date);
    startDate.setUTCHours(0, 0, 0, 0);
    return startDate;
  },

  async setEndDate(date) {
    // If date is provided, convert it to end of the day (23:59:59)
    let endDate = new Date(date);
    endDate.setUTCHours(23, 59, 59, 999); // Set to last millisecond of the day
    return endDate;
  },

  async getMonthDifference(startDate, endDate) {
    // Convert start and end dates to JavaScript Date objects if they are strings
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    // Calculate the difference in months
    let diffMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12;
    diffMonths -= startDate.getMonth();
    diffMonths += endDate.getMonth();

    // Adjust the difference if endDate is less than startDate in the same month
    if (endDate.getDate() < startDate.getDate()) {
      diffMonths--;
    }

    return diffMonths;
  },

  async getDateAfterMonths(months) {
    // Get today's date
    const today = new Date();

    // Add the specified number of months to today's date
    const futureDate = new Date(today);
    futureDate.setMonth(today.getMonth() + months);

    // Format the future date
    const formattedFutureDate = futureDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return formattedFutureDate;
  },

  async getDateAfterMonthsWithoutFormating(months) {
    // Get today's date
    const today = new Date();

    // Add the specified number of months to today's date
    const futureDate = new Date(today);
    futureDate.setMonth(today.getMonth() + months);

    return futureDate;
  },

  async getStartDateAndEndDateOfMonth() {
    const today = moment();
    const month = today.format("MM"); // Use MM for numerical month
    const year = today.format("YYYY"); // Use YYYY for full year

    const startDate = moment
      .utc(`${year}-${month}-01`)
      .startOf("month")
      .toDate();
    startDate.setUTCHours(0, 0, 0, 0);

    const endDate = moment.utc(`${year}-${month}-01`).endOf("month").toDate();
    endDate.setUTCHours(23, 59, 59, 999);

    return { startDate, endDate };
  },

  async formatDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  },

  async generateNextPrNo(loginInfo) {
    const PrQtNoGenerationService = require("../services/prQtPoNoServices");
    const prQtNoServices = new PrQtNoGenerationService();

    let lastData = await prQtNoServices.getFirstDataUpdated(
      loginInfo.organizationId
    );

    if (!lastData || !lastData.prNo) {
      throw new Error(Messages.UnableToSaveEntity);
    }

    let prNo = await this.generateNextNumber(lastData.prNo);

    console.log(prNo, "prNo");

    await prQtNoServices.updateData(lastData.id, { prNo });

    return prNo;
  },

  async generateNextRfqNo(loginInfo) {
    const PrQtNoGenerationService = require("../services/prQtPoNoServices");
    const prQtNoServices = new PrQtNoGenerationService();

    //--------- rfq no generation code
    let lastData = await prQtNoServices.getFirstDataUpdated(
      loginInfo.organizationId
    );

    if (!lastData || !lastData.rfqNo) {
      throw new Error("Unable To Get Last No");
    }

    let rfqNo = await this.generateNextNumber(lastData.rfqNo);
    console.log(rfqNo);
    await prQtNoServices.updateData(lastData.id, { rfqNo });

    let rfqDate = new Date(await this.datetime("db"));

    // Concatenate the parts to form the desired format
    rfqDate = `${String(rfqDate.getFullYear()).slice(-2)}${String(
      rfqDate.getMonth() + 1
    ).padStart(2, "0")}${String(rfqDate.getDate()).padStart(2, "0")}`;

    // RFQ-241201-AA000
    rfqNo = `RFQ-${rfqDate}-${rfqNo.substring(2)}`;
    console.log(rfqNo);
    return rfqNo;
  },

  async generateNextBudgetPeriodNo(loginInfo) {
    const PrQtNoGenerationService = require("../services/prQtPoNoServices");
    const prQtNoServices = new PrQtNoGenerationService();

    //--------- bp no generation code

    let lastData = await prQtNoServices.getFirstDataUpdated(
      loginInfo.organizationId
    );

    if (!lastData || !lastData.bpNo) {
      throw new Error("Unable To Get Last No");
    }

    let bpNo = await this.generateNextNumber(lastData.bpNo);
    console.log(bpNo);
    await prQtNoServices.updateData(lastData.id, { bpNo });
    return bpNo;
  },

  async generateNextUOMNo(loginInfo) {
    const PrQtNoGenerationService = require("../services/prQtPoNoServices");
    const prQtNoServices = new PrQtNoGenerationService();

    //--------- uom no generation code

    let lastData = await prQtNoServices.getFirstDataUpdated(
      loginInfo.organizationId
    );

    if (!lastData || !lastData.uomNo) {
      throw new Error("Unable To Get Last No");
    }

    let uomNo = await this.generateNextNumber(lastData.uomNo);
    console.log(uomNo);
    await prQtNoServices.updateData(lastData.id, { uomNo });
    return "U" + uomNo;
  },
};
