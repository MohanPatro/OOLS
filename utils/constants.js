let constants = {
  Payment: "Payment",
  Shipping: "Shipping",
  TermAndConditions: "T&C",
  ShippingMethod: "ShippingMethod",
  COA: "COA",
  UoM: "UoM",
  Tax: 0.18,
  EmailTypeConstants: {
    PrClosed: "PrClosed",
    PrAwarded: "PrAwarded",
    QtSubmitted: "QtSubmitted",
    PrAssigned: "PrAssigned",
  },
  ExcelLimitConstants: {
    categoryLimit: 100,
    subCategoryLimit: 100,
    customerTermsLimit: 100,
    productTypeLimit: 100,
    shippingMethodLimit:100,
    coaOrganizationLimit:100,
    budgetPeriodLimit:100,
    customerUomLimit:100,
    bankLimit: 500,
  },
};

module.exports = constants;
