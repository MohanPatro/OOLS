const common = require("../helpers/common");
const logModel = require("../models/log-model");
const fs = require("fs");

module.exports = {
  async sendEmail(fileUrl, subject, receiver, data) {
    try {
      console.log(fileUrl, subject, receiver, data);

      let transporter = await common.configuremail();

      let template = fs.readFileSync(fileUrl, { encoding: "utf-8" });

      for (let key of Object.keys(data)) {
        template = template.replace(
          new RegExp("{" + key + "}", "g"),
          data[key] || ""
        );
      }

      const tableData=data?.qtLineItemDataForEmail ?? [];
      if(tableData)
      {
          // Function to generate HTML for a single row based on the data
        function generateRowHTML(data) {
          return `<tr><td>${data.itemCode}</td><td>${data.item}</td><td>${data.prQuantity}</td><td>${data.qtLineItemFinalPrice}</td></tr>`;
        }

        // Generate HTML for all rows
        const tableRowsHTML = tableData.map(entry => generateRowHTML(entry)).join('');

        template = template.replace('{tableRows}', tableRowsHTML);
      }
            
     

      let info = await common.sendMail(
        transporter,
        subject,
        template,
        receiver
      );
      console.log(info, "email info");
    } catch (error) {
      await logModel.Insert({ stack: error.stack }, error);
    }
  },
};
