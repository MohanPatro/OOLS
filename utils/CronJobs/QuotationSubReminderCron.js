const cron = require("node-cron");
const logModel = require("../../models/log-model");
const constants = require("../constants");
const PrLineItemService = require("../../services/prLineItemServices");
const PurchaseRequisitionService = require("../../services/purchaseRequisitionService");
const QuotationService = require("../../services/quotationService");
// const QtLineItemsServices = require("../../services/QtLineItemsServices");
const EmailerUtils = require("../EmailerUtils");
// const VendorOrgnizationService = require("../../services/VendorService");
// const VendorUserService = require("../../services/VendorUserService");
// const CustomerConfigManagements = require("../../services/CustomerConfigService");
const { Op } = require("sequelize");
const VendorUserService = require("../../services/VendorUserService");
const common = require("../../helpers/common");

const prLineItemService = new PrLineItemService();
const purchaseRequestService = new PurchaseRequisitionService();

// min h
cron.schedule("00 01 * * *", async () => {
  try {
    let prData = await purchaseRequestService.getListOfPrAndVendorsForReminderEmail();

    // map to avoid multiple email for same pr
    let emailPrMap = new Map(); // prId key [suppliers] value

    // map to avoid vendor user db hits
    let vendorMap = new Map(); // vendorId key and Info in obj

    //map to avaoid pr info db hits
    let prInfoMap = new Map(); // prid in key and data in value

    if (prData) {
      //purchaseRequestId: 201, suppliers: '127,128,129,131,154'

      for (let pr of prData) {
        try {
          // finding out the supppliers who have not submited the quotation

          // console.log("----------Pr Data---------------");
          // console.log(pr);
          // console.log("-------------------------");

          let filterSuppliers = await QuotationService.getFilterVendorsForReminderMail(
            pr.purchaseRequestId,
            pr.suppliers
          );

          // console.log("----------Filter Suppliers---------------");
          // console.log(filterSuppliers);
          // console.log("-------------------------");

          let vendorsData = filterSuppliers[0];

          // console.log("----------vendorsData---------------");
          // console.log(vendorsData);
          // console.log("-------------------------");

          let prInfo = {};

          if (prInfoMap.has(pr.purchaseRequestId)) {
            prInfo = prInfoMap.get(pr.purchaseRequestId);
            // console.log("Data From Pr Map", prInfo);
          } else {
            prInfo = await purchaseRequestService.getDataByIdForEmailTemplate(
              pr.purchaseRequestId
            );
            prInfoMap.set(pr.purchaseRequestId, prInfo);
          }

          for (let ven of vendorsData) {
            try {
              let suppliersData = emailPrMap.has(pr.purchaseRequestId)
                ? emailPrMap.get(pr.purchaseRequestId)
                : [];

              // console.log("----------suppliersData from map---------------");
              // console.log(suppliersData);
              // console.log("-------------------------");

              //email to vendor for invitation
              if (suppliersData.includes(ven.VendorOrganizationId) == false) {
                let vendorUser = {};

                if (vendorMap.has(ven.VendorOrganizationId)) {
                  vendorUser = vendorMap.get(ven.VendorOrganizationId);
                  // console.log("Data From Vendor Map", vendorUser);
                } else {
                  vendorUser = await VendorUserService.getDataForEmailTemplates(
                    {
                      VendorOrganizationId: ven.VendorOrganizationId,
                    },
                    ["UserName"]
                  );
                  vendorMap.set(ven.VendorOrganizationId, vendorUser);
                }

                let template = "vmstemplates/VenPrInvitationReminder.html";
                let reciver = vendorUser.UserName;
                let subject = `Reminder:Submission of quotation for ${prInfo?.Organization?.orgName}-PR ${prInfo?.prNo}`;

                let emailData = {
                  VendorName: ven?.CompanyName || "Vendor", // need to add relation with vendor user
                  CustOrgName: prInfo?.Organization?.orgName || null,
                  PrDescription: prInfo?.purchaseReason || null,
                  PrDueDate: await common.formatDate(prInfo?.dueDate),
                  PrNo: prInfo?.prNo || null,
                  CustOrgPhone: prInfo?.Organization?.phoneNumber || null,
                };

                await EmailerUtils.sendEmail(
                  template,
                  subject,
                  reciver,
                  emailData
                );

                suppliersData.push(ven.VendorOrganizationId);

                emailPrMap.set(pr.purchaseRequestId, suppliersData);

                // console.log("----------map---------------");
                // console.log(emailPrMap);
                // console.log(vendorMap);
                // console.log(prInfoMap);
                // console.log("-------------------------");
              }
            } catch (error) {
              await logModel.Insert({ stack: error.stack }, error);
            }
          }
        } catch (error) {
          await logModel.Insert({ stack: error.stack }, error);
        }
      }
    }

    await logModel.Insert({ emailPrMap, vendorMap, prInfoMap }, "Cron Job");

    emailPrMap.clear();
    vendorMap.clear();
    prInfoMap.clear();

    await logModel.Insert(
      { emailPrMap, vendorMap, prInfoMap },
      "Cron Job After Clear"
    );

    // console.log(emailPrMap, vendorMap, prInfoMap);
  } catch (error) {
    await logModel.Insert({ stack: error.stack }, error);
    console.log(error);
  }
});
