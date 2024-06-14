const cron = require("node-cron");
const logModel = require("../models/log-model");
const EmailCronJobDataService = require("../services/EmailCronJobDataServices");
const constants = require("./constants");
const PrLineItemService = require("../services/prLineItemServices");
const PurchaseRequisitionService = require("../services/purchaseRequisitionService");
const EmailerUtils = require("./EmailerUtils");
const VendorOrgnizationService = require("../services/VendorService");
const VendorUserService = require("../services/VendorUserService");
const CustomerConfigManagements = require("../services/CustomerConfigService");
const { Op } = require("sequelize");
const common = require("../helpers/common");

const prLineItemService = new PrLineItemService();
const purchaseRequestService = new PurchaseRequisitionService();

// Schedule a cron job to run every 10 minutes
cron.schedule("*/20 * * * *", async () => {
  try {
    // schedule the work
    let nextTask = await EmailCronJobDataService.getNextTask();
    // console.log(nextTask, "nextTask");
    //await logModel.Insert({ nextTask }, "");
    if (nextTask) {
      handleCronTask(nextTask);
    }
  } catch (error) {
    await logModel.Insert({ stack: error.stack }, error);
    console.log(error);
  }
});

async function handleCronTask(nextTask) {
  let emailType = nextTask.emailType || "";

  console.log(emailType);

  switch (emailType) {
    case constants.EmailTypeConstants.PrAssigned:
      await prInvitationEmail(nextTask);
      break;
    default:
      break;
  }
}

async function prInvitationEmail(data) {
  try {
    console.log("pr invitation ");

    let prLineItemId = data.moduleId;
    let prLineItemData = await prLineItemService.getDataByAttributesForCron(
      prLineItemId,
      ["suppliers", "purchaseRequestId"]
    );

    if (
      prLineItemData &&
      prLineItemData.suppliers &&
      prLineItemData.purchaseRequestId
    ) {
      let suppliers = prLineItemData.suppliers.split(",");
      suppliers = suppliers.slice(
        data.currentOffSet,
        data.currentOffSet + data.singleTimeSendCount
      );

      console.log(suppliers, "--", suppliers.length);

      // if the count of suppliers array is not equal to the data.singleTimeSendCount
      // that means  there is no further suppliers reaminaing.

      let prData = await purchaseRequestService.getDataByIdForEmailTemplate(
        prLineItemData.purchaseRequestId
      );

      let emailTemplte = "vmstemplates/PrInvitation.html";
      let subject = `Invitation to Participate: New Purchase Requisition (PR) Created for ${prData.Organization.orgName}`;

      for (let vendor of suppliers) {
        try {
          // email already send to vendor

          let emailSend = await prLineItemService.existData({
            prLineItemId: {
              [Op.lt]: prLineItemId,
            },
            purchaseRequestId: prLineItemData.purchaseRequestId,
            suppliers: {
              [Op.regexp]: `(^|,)${vendor}(,|$)`, // Construct regex pattern to match the givenId
            },
          });

          console.log("---------------------");
          console.log(emailSend, vendor);
          console.log("---------------------");

          if (emailSend) {
            continue;
          }

          let vendorOrgInfo = await VendorOrgnizationService.getDataForEmailTemplates(
            { VendorOrganizationId: vendor },
            ["VendorUserId", "CompanyName", "CustomerOrganizationId"]
          );

          if (!vendorOrgInfo || !vendorOrgInfo.VendorUserId) {
            continue;
          }

          let vendorUserInfo = await VendorUserService.getDataForEmailTemplates(
            { VendorUserId: vendorOrgInfo.VendorUserId },
            ["UserName"]
          );

          if (!vendorUserInfo || !vendorUserInfo.UserName) {
            continue;
          }

          let reciver = vendorUserInfo.UserName;

          let configuration = await CustomerConfigManagements.getDataByFilterWithAttributes(
            { CustomerOrganizationId: vendorOrgInfo.CustomerOrganizationId },
            ["VendorPanel"]
          );

          let vendorPanelUrl = configuration?.VendorPanel;

          let emailerData = {
            CustomerOrg: prData.Organization.orgName,
            VendorName: vendorUserInfo.UserName,
            PrNo: prData.prNo,
            PrDescription: prData.purchaseReason,
            DueDate: await common.formatDate(prData?.dueDate),
            CustomerContactEmail: prData.Organization.orgEmail,
            CustomerContact: prData.Organization.phoneNumber,
            VendorPanelUrl: vendorPanelUrl,
          };

          await EmailerUtils.sendEmail(
            emailTemplte,
            subject,
            reciver,
            emailerData
          );
        } catch (error) {
          await logModel.Insert({ stack: error.stack }, error);
          console.log(error);
        }
      }

      let status = 1;
      if (suppliers.length < data.singleTimeSendCount) {
        status = 2;
      }

      await EmailCronJobDataService.updateData(data.id, {
        status,
        mailSendCount: data.mailSendCount + data.singleTimeSendCount,
        mailSendCurrentPageNo: data.mailSendCurrentPageNo + 1,
        currentOffSet: data.currentOffSet + data.singleTimeSendCount,
      });
    } else {
      await EmailCronJobDataService.updateData(data.id, {
        status: 2,
        mailSendCount: data.mailSendCount + data.singleTimeSendCount,
        mailSendCurrentPageNo: data.mailSendCurrentPageNo + 1,
        currentOffSet: data.currentOffSet + data.singleTimeSendCount,
      });
    }
  } catch (error) {
    await logModel.Insert({ stack: error.stack }, error);
    console.log(error);
  }
}

// for pr invitation we are storing the line item ids.
