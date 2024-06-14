const { body, param, check, validationResult } = require("express-validator");
const base_response = require("../helpers/base-response").response;

const prGroupValidations = (req, res, next) => {
  const validationRules = [
    body("prGroup").notEmpty().withMessage("Please Provide Pr Group"),
    body("prGroupMeaning")
      .notEmpty()
      .withMessage("Please Provide The Meaning Of PR Group"),
    body("prGroupCategory")
      .notEmpty()
      .withMessage("Please Provide Pr Group Category")
      .matches(/^(Goods|Service|Project|Others)$/)
      .withMessage(
        "Purchase Group Category must be 'Goods', 'Service', or 'Project'"
      ),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next();
    } else {
      res
        .status(422)
        .json(base_response(422, { errors: errors.array() }, "Invalid Data"));
    }
  });
};
const quotationValidations = (req, res, next) => {
  const validationRules = [
    body("qtFromName").notEmpty().withMessage("qtFromName is required"),
    body("qtFromAddress").notEmpty().withMessage("qtFromAddress is required"),
    body("qtFromGst").notEmpty().withMessage("qtFromGst is required"),
    body("qtFromPan").notEmpty().withMessage("qtFromPan is required"),
    body("qtToName").notEmpty().withMessage("qtToName is required"),
    body("qtToAddress").notEmpty().withMessage("qtToAddress is required"),
    body("qtToGst").notEmpty().withMessage("qtToGst is required"),
    body("qtToPan").notEmpty().withMessage("qtToPan is required"),
    body("countryOfSupply")
      .notEmpty()
      .withMessage("countryOfSupply is required"),
    body("countryToSupply")
      .notEmpty()
      .withMessage("countryToSupply is required"),
    body("subTotal").notEmpty().withMessage("subTotal is required"),
    body("discount").notEmpty().withMessage("discount is required"),
    body("total").notEmpty().withMessage("total is required"),
    body("purchaseRequestId")
      .notEmpty()
      .withMessage("purchaseRequestId is required"),
    body("custId").notEmpty().withMessage("custId is required"),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next();
    } else {
      res
        .status(422)
        .json(base_response(422, { errors: errors.array() }, "Invalid Data"));
    }
  });
};

const purchaseRequestValidations = (req, res, next) => {
  const validationRules = [
    body("request").notEmpty().withMessage("request is required"),
    body("description").notEmpty().withMessage("description is required"),
    body("category").notEmpty().withMessage("category is required"),
    body("prGroup").notEmpty().withMessage("prGroup is required"),
    body("prQuantity").notEmpty().withMessage("prQuantity is required"),
    body("prUnits").notEmpty().withMessage("prUnits is required"),
    body("startDate").notEmpty().withMessage("startDate is required"),
    body("endDate").notEmpty().withMessage("endDate is required"),
    body("deliveryDate").notEmpty().withMessage("deliveryDate is required"),
    body("location").notEmpty().withMessage("location is required"),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next();
    } else {
      res
        .status(422)
        .json(base_response(422, { errors: errors.array() }, "Invalid Data"));
    }
  });
};

const purchaseOrderValidations = (req, res, next) => {
  const validationRules = [
    body("poTitle").notEmpty().withMessage("poTitle is required"),
    body("poFromName").notEmpty().withMessage("poFromName is required"),
    body("poFromAddress").notEmpty().withMessage("poFromAddress is required"),
    body("poFromGst").notEmpty().withMessage("poFromGst is required"),
    body("poFromPan").notEmpty().withMessage("poFromPan is required"),
    body("poToName").notEmpty().withMessage("poToName is required"),
    body("poToAddress").notEmpty().withMessage("poToAddress is required"),
    body("poToGst").notEmpty().withMessage("poToGst is required"),
    body("poToPan").notEmpty().withMessage("poToPan is required"),
    body("countryOfSupply")
      .notEmpty()
      .withMessage("countryOfSupply is required"),
    body("countryToSupply")
      .notEmpty()
      .withMessage("countryToSupply is required"),
    body("subTotal").notEmpty().withMessage("subTotal is required"),
    body("discount").notEmpty().withMessage("discount is required"),
    body("total").notEmpty().withMessage("total is required"),
    body("vendorId").notEmpty().withMessage("vendorId is required"),
    body("quotationId").notEmpty().withMessage("quotationId is required"),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next();
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" });
    }
  });
};

const purchaseOrderValidationsForPrCreation = (req, res, next) => {
  const validationRules = [
    body("ProjectNumber")
      .optional()
      .withMessage("ProjectNumber is required")
      .matches(/^[a-zA-Z0-9/-]*$/)
      .withMessage(
        "Project Number is required ,only allowed text or text with special character / or -"
      ),
  ];
  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next();
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" });
    }
  });
};

const InvoiceValidations = (req, res, next) => {
  const validationRules = [
    //   body('poTitle').notEmpty().withMessage('poTitle is required'),
    body("invoiceFromName")
      .notEmpty()
      .withMessage("invoiceFromName is required"),
    body("invoiceFromAddress")
      .notEmpty()
      .withMessage("invoiceFromAddress is required"),
    body("invoiceFromGst").notEmpty().withMessage("invoiceFromGst is required"),
    body("invoiceFromPan").notEmpty().withMessage("invoiceFromPan is required"),
    body("invoiveFromEmail")
      .notEmpty()
      .withMessage("invoiveFromEmail is required"),
    body("invoiceFromPhoneNumber")
      .notEmpty()
      .withMessage("invoiceFromPhoneNumber is required"),
    body("invoiceToName").notEmpty().withMessage("invoiceToName is required"),
    body("invoiceToAddress")
      .notEmpty()
      .withMessage("invoiceToAddress is required"),
    body("invoiceToGst").notEmpty().withMessage("invoiceToGst is required"),
    body("invoiceToPan").notEmpty().withMessage("invoiceToPan is required"),
    body("invoiveToEmail").notEmpty().withMessage("invoiveToEmail is required"),
    body("invoiceToPhoneNumber")
      .notEmpty()
      .withMessage("invoiceToPhoneNumber is required"),
    body("countryOfSupply")
      .notEmpty()
      .withMessage("countryOfSupply is required"),
    body("countryToSupply")
      .notEmpty()
      .withMessage("countryToSupply is required"),
    body("subTotal").notEmpty().withMessage("subTotal is required"),
    body("discount").notEmpty().withMessage("discount is required"),
    body("total").notEmpty().withMessage("total is required"),
    body("custId").notEmpty().withMessage("custId is required"),
    body("purchaseOrderId")
      .notEmpty()
      .withMessage("purchaseOrderId is required"),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next();
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" });
    }
  });
};

const userValidations = (req, res, next) => {
    console.log(req.body)
  const validationRules = [
    body("email")
      .notEmpty()
      .withMessage("EmailId is required")
      .isEmail()
      .withMessage("Please Provide Proper Emaid Id "),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,20}$/
      )
      .withMessage(
        "Password must be at 6 to 20 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    body("name")
      .notEmpty()
      .withMessage("Please Provide First Name Of User"),
    body("username").notEmpty().withMessage("Please Provide Last Name Of User"),
    body("role").notEmpty().withMessage("Please Provide Role Of User"),
    body("mobile")
      .notEmpty()
      .withMessage("Please Provide PhoneNumber Of User"),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next();
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" });
    }
  });
};

const roleValidations = (req, res, next) => {
  const validationRules = [
    body("role").notEmpty().withMessage("Role Name is required"),
    body("description").notEmpty().withMessage("Role Description is Required"),
    body("moduleAccess")
      .notEmpty()
      .withMessage("Please Provide Module Access Of Role"),
  ];
  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next();
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" });
    }
  });
};

const receiptValidations = (req, res, next) => {
  const validationRules = [
    body("firstName").notEmpty().withMessage("firstName is required"),
    body("lastName").notEmpty().withMessage("lastName is required"),
    body("email").notEmpty().withMessage("email is required"),
    body("billingAddress").notEmpty().withMessage("billingAddress is required"),
    body("billingState").notEmpty().withMessage("billingState is required"),
    body("billingCity").notEmpty().withMessage("billingCity is required"),
    body("billingZip").notEmpty().withMessage("billingZip is required"),
    body("billingPhone").notEmpty().withMessage("billingPhone is required"),
    body("shippingAddress")
      .notEmpty()
      .withMessage("shippingAddress is required"),
    body("shippingState").notEmpty().withMessage("shippingState is required"),
    body("shippingCity").notEmpty().withMessage("shippingCity is required"),
    body("shippingZip").notEmpty().withMessage("shippingZip is required"),
    body("shippingPhone").notEmpty().withMessage("shippingPhone is required"),
    body("paymentMethod").notEmpty().withMessage("paymentMethod is required"),
    body("subTotal").notEmpty().withMessage("subTotal is required"),
    body("discount").notEmpty().withMessage("discount is required"),
    body("shiping").notEmpty().withMessage("shiping is required"),
    body("tax").notEmpty().withMessage("tax is required"),
    body("total").notEmpty().withMessage("total is required"),
    body("paymentMethod").notEmpty().withMessage("paymentMethod is required"),
    body("transferFrom").notEmpty().withMessage("transferFrom is required"),
    body("transferTo").notEmpty().withMessage("transferTo is required"),
    body("referenceNo").notEmpty().withMessage("referenceNo is required"),
    body("paymentDateTime")
      .notEmpty()
      .withMessage("paymentDateTime is required"),
    body("sendorName").notEmpty().withMessage("sendorName is required"),
    body("comment").notEmpty().withMessage("comment is required"),
    body("vendorId").notEmpty().withMessage("vendorId is required"),
    body("purchaseOrderId")
      .notEmpty()
      .withMessage("purchaseOrderId is required"),
    body("invoiceId").notEmpty().withMessage("invoiceId is required"),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next(); // If no validation errors, proceed to the next middleware/route handler
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" }); // If validation fails, return errors
    }
  });
};

const organizationValidations = (req, res, next) => {
  const validationRules = [
    body("orgName").notEmpty().withMessage("orgName is required"),
    body("orgDescription").notEmpty().withMessage("orgDescription is required"),
    body("orgEmail").notEmpty().withMessage("orgEmail is required"),
    body("orgAddress").notEmpty().withMessage("orgAddress is required"),
    body("orgTaxNumber").notEmpty().withMessage("orgTaxNumber is required"),
    body("orgGST").notEmpty().withMessage("orgGST is required"),
    body("CustomerPanel")
      .notEmpty()
      .withMessage("CustomerPanel url is required"),
    body("VendorPanel").notEmpty().withMessage("VendorPanel url is required"),
    body("StorageAllowed")
      .notEmpty()
      .withMessage("StorageAllowed url is required"),
    body("StorageBucketFolder")
      .notEmpty()
      .withMessage("StorageBucketFolder url is required"),
    body("ExpiryDate").notEmpty().withMessage("ExpiryDate url is required"),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next(); // If no validation errors, proceed to the next middleware/route handler
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" }); // If validation fails, return errors
    }
  });
};

const productValidations = (req, res, next) => {
  const validationRules = [
    body("ItemName").notEmpty().withMessage("Item Name is required"),
    body("ItemType").notEmpty().withMessage("Item Type is required"),
    body("Category").notEmpty().withMessage("Category is required"),
    body("SubCategory").notEmpty().withMessage("Sub Category is required"),
    body("PricingType").notEmpty().withMessage("Pricing Type is required"),
    body("CreateType").notEmpty().withMessage("Create Type is required"), // 0 Means from Product Page, 1 Means from PR
    check("Description")
      .if((value, { req }) => req.body.CreateType === "0")
      .notEmpty()
      .withMessage(
        "Description is required when Product is creating from Product Page"
      ),
    body("Price").notEmpty().withMessage("Price is required"),
    body("Currency").notEmpty().withMessage("Currency is required"),
    body("Discount").notEmpty().withMessage("Discount is required"),
    body("AvailableInCountries")
      .notEmpty()
      .withMessage("Available In Countries is required"),
    body("Visibility").notEmpty().withMessage("Visibility is required"),
    body("VerifiedStatus")
      .notEmpty()
      .withMessage("Verified Status is required"),
    check("Images")
      .if((value, { req }) => req.body.CreateType === "0")
      .custom((value, { req }) => {
        if (req.files && req.files.length > 0) {
          return true;
        } else {
          throw new Error("Product images are required when Create Type is 0");
        }
      }),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next(); // If no validation errors, proceed to the next middleware/route handler
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" }); // If validation fails, return errors
    }
  });
};

const CustomerDeliveryValidations = (req, res, next) => {
  const validationRules = [
    body("locationName").notEmpty().withMessage("Location Name is required"),
    body("address").notEmpty().withMessage("Address is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("state").notEmpty().withMessage("State is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("zipcode").notEmpty().withMessage("zipcode is required"),
    body("contactPerson").notEmpty().withMessage("contact Person is required"),
    body("phoneNumber").notEmpty().withMessage("phone Number is required"),
    body("phoneNumberCountrycode")
      .notEmpty()
      .withMessage("phone Number Country code is required"),
    body("address_type").notEmpty().withMessage("address_type is required")
  ];

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next(); // If no validation errors, proceed to the next middleware/route handler
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" }); // If validation fails, return errors
    }
  });
};

const CustomerApprovalCreationValidations = (req, res, next) => {
  const validationRules = [
    body("NameOfRequest").notEmpty().withMessage("Title Name is required"),
    body("ApproversId").notEmpty().withMessage("Approvers is required"),
    body("RequestType").notEmpty().withMessage("Country is required"),
    //  body('Description').notEmpty().withMessage('Description is required'),
    //   body('Priority').notEmpty().withMessage('Priority is required'),
    body("ModuleId").notEmpty().withMessage("Module Id is required"),
    body("ModuleNo").notEmpty().withMessage("Module No is required"),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next(); // If no validation errors, proceed to the next middleware/route handler
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" }); // If validation fails, return errors
    }
  });
};

const CutomerApproveRejectRequestValidation = (req, res, next) => {
  const validationRules = [
    body("CustomerApprovalLogsId")
      .notEmpty()
      .withMessage("CustomerApprovalLogsId Name is required"),
    body("ApprovalRequestId")
      .notEmpty()
      .withMessage("Approval Request Id is required"),
    body("Type").notEmpty().withMessage("Type is required"),
    body("comment").notEmpty().withMessage("Description is required"),
    body("ApprvalStatus").notEmpty().withMessage("ApprvalStatus is required"),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next(); // If no validation errors, proceed to the next middleware/route handler
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" }); // If validation fails, return errors
    }
  });
};

const quotationValidationsV2 = (req, res, next) => {
  const validationRules = [
    body("countryOfSupply")
      .notEmpty()
      .withMessage("countryOfSupply is required"),
    body("countryToSupply")
      .notEmpty()
      .withMessage("countryToSupply is required"),
    body("subTotalPrice").notEmpty().withMessage("subTotalPrice is required"),
    body("tax").notEmpty().withMessage("tax is required"),
    body("totalPrice").notEmpty().withMessage("totalPrice is required"),
    body("discount").notEmpty().withMessage("discount is required"),
    body("purchaseRequestId")
      .notEmpty()
      .withMessage("purchaseRequestId is required"),
    body("custId").notEmpty().withMessage("custId is required"),
    body("prLineItemsIds").notEmpty().withMessage("prLineItemsIds is required"),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next();
    } else {
      res
        .status(422)
        .json(base_response(422, { errors: errors.array() }, "Invalid Data"));
    }
  });
};

const CoaOrganizationValidator = (req, res, next) => {
  const validationRules = [
    body("Title").notEmpty().withMessage("Title Name is required"),
    body("Description").notEmpty().withMessage("Description is required"),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next(); // If no validation errors, proceed to the next middleware/route handler
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" }); // If validation fails, return errors
    }
  });
};

const CustomerVendorUserOrganizationValidator = (req, res, next) => {
  const validationRules = [
    body("UserName").notEmpty().withMessage("User Name Name is required"),
    body("Password")
      .notEmpty()
      .withMessage("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,20}$/
      )
      .withMessage(
        "Password must be at 8 to 20 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    body("ConfirmPassword")
      .notEmpty()
      .withMessage("Confirm Password is required")
      .custom((value, { req }) => {
        if (value !== req.body.Password) {
          throw new Error("Passwords do not match");
        }
        return true;
      }),
    body("RegisteredCountry")
      .notEmpty()
      .withMessage("Registered Country Name is required"),
    body("CompanyType").notEmpty().withMessage("Company Type is required"),
    body("VendorType").notEmpty().withMessage("Vendor Type is required"),
    //  body('CompanyRegistrationNumber').notEmpty().withMessage('Company Registration Number Name is required'),
    body("RegisteredCapital")
      .notEmpty()
      .withMessage("Registered Capital is required"),
    body("EstablishedDate")
      .notEmpty()
      .withMessage("Established Date Name is required"),
    body("CompanyName").notEmpty().withMessage("Company Name is required"),
    body("CountryCode").notEmpty().withMessage("Country Number is required"),
    body("MobileNumber").notEmpty().withMessage("Mobile Number is required"),
    body("PhoneNumber").notEmpty().withMessage("Phone Number is required"),
    //  body('PanNumber').notEmpty().withMessage('Pan Number is required'),
    // body('GstNumber').notEmpty().withMessage('Gst Number is required'),
    body("Address1").notEmpty().withMessage("Address1 Name is required"),
    body("Address2").notEmpty().withMessage("Address2 is required"),
    body("PostalCode").notEmpty().withMessage("PostalCode is required"),
    body("Country").notEmpty().withMessage("Country is required"),
    body("State").notEmpty().withMessage("State Name is required"),
    body("City").notEmpty().withMessage("City is required"),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next(); // If no validation errors, proceed to the next middleware/route handler
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" }); // If validation fails, return errors
    }
  });
};

const VendorUserOrganizationValidator = (req, res, next) => {
  const validationRules = [
    body("UserName").notEmpty().withMessage("User Name Name is required"),
    body("hostname").notEmpty().withMessage("hostname is required"),
    body("Password")
      .notEmpty()
      .withMessage("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,20}$/
      )
      .withMessage(
        "Password must be at 8 to 20 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    body("ConfirmPassword")
      .notEmpty()
      .withMessage("Confirm Password is required")
      .custom((value, { req }) => {
        if (value !== req.body.Password) {
          throw new Error("Passwords do not match");
        }
        return true;
      }),
    body("RegisteredCountry")
      .notEmpty()
      .withMessage("Registered Country Name is required"),
    body("CompanyType").notEmpty().withMessage("Company Type is required"),
    body("VendorType").notEmpty().withMessage("Vendor Type is required"),
    //  body('CompanyRegistrationNumber').notEmpty().withMessage('Company Registration Number Name is required'),
    body("RegisteredCapital")
      .notEmpty()
      .withMessage("Registered Capital is required"),
    body("EstablishedDate")
      .notEmpty()
      .withMessage("Established Date Name is required"),
    body("CompanyName").notEmpty().withMessage("Company Name is required"),
    body("CountryCode").notEmpty().withMessage("Country Number is required"),
   // body("MobileNumber").notEmpty().withMessage("Mobile Number is required"),
    body("PhoneNumber").notEmpty().withMessage("Phone Number is required"),
    // body('PanNumber').notEmpty().withMessage('Pan Number is required'),
    // body('GstNumber').notEmpty().withMessage('Gst Number is required'),
    body("Address1").notEmpty().withMessage("Address1 Name is required"),
    body("Address2").notEmpty().withMessage("Address2 is required"),
    body("PostalCode").notEmpty().withMessage("PostalCode is required"),
    body("Country").notEmpty().withMessage("Country is required"),
    body("State").notEmpty().withMessage("State Name is required"),
    body("City").notEmpty().withMessage("City is required"),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next(); // If no validation errors, proceed to the next middleware/route handler
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" }); // If validation fails, return errors
    }
  });
};

const VendorApproveRejectValidator = (req, res, next) => {
  const validationRules = [
    body("VendorOrganizationId")
      .notEmpty()
      .withMessage("Vendor Organization Id is required"),
    body("ApprovalStatus")
      .notEmpty()
      .withMessage("Approval Status is required"),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next(); // If no validation errors, proceed to the next middleware/route handler
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" }); // If validation fails, return errors
    }
  });
};

const VendorUserLoginValidator = (req, res, next) => {
  const validationRules = [
    body("UserName").notEmpty().withMessage("User Name is required"),
    body("hostname").notEmpty().withMessage("hostname is required"),
    body("Password").notEmpty().withMessage("Password is required"),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next(); // If no validation errors, proceed to the next middleware/route handler
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" }); // If validation fails, return errors
    }
  });
};

const VendorUserUpdateOrganizationValidator = (req, res, next) => {
  const validationRules = [
    body("VendorOrganizationId")
      .notEmpty()
      .withMessage("Vendor Organization Id is required For Update"),
    body("VendorAddressId")
      .notEmpty()
      .withMessage("VendorAddressId is required For Update"),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next(); // If no validation errors, proceed to the next middleware/route handler
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" }); // If validation fails, return errors
    }
  });
};

const VendorUserUpdateOrganizationValidatorFromData = (req, res, next) => {
  const validationRules = [
    body("VendorOrganizationId")
      .notEmpty()
      .withMessage("Vendor Organization Id is required For Update"),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next(); // If no validation errors, proceed to the next middleware/route handler
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" }); // If validation fails, return errors
    }
  });
};

const CustomerVendorUserUpdateOrganizationValidator = (req, res, next) => {
  const validationRules = [
    body("VendorOrganizationId")
      .notEmpty()
      .withMessage("Vendor Organization Id is required For Update"),
    body("VendorUserId")
      .notEmpty()
      .withMessage("Vendor User Id is required For Update"),
    body("VendorAddressId")
      .notEmpty()
      .withMessage("VendorAddressId is required For Update"),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next(); // If no validation errors, proceed to the next middleware/route handler
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" }); // If validation fails, return errors
    }
  });
};

const VendorContactValidator = (req, res, next) => {
  const validationRules = [
    body("FirstName").notEmpty().withMessage("First Name is required"),
    body("LastName").notEmpty().withMessage("Last Name is required"),
    body("Email").notEmpty().withMessage("Email is required"),
    body("Position").notEmpty().withMessage("Position is required"),
    body("Department").notEmpty().withMessage("Department is required"),
    body("PhoneNumberCountryCode")
      .notEmpty()
      .withMessage("Phone Number Country Code is required"),
    body("PhoneNumber").notEmpty().withMessage("Phone Number is required"),
    // body("WhatsAppCountryCode")
    //   .notEmpty()
    //   .withMessage("WhatsApp Country Code is required"),
    // body("WhatsAppNumber")
    //   .notEmpty()
    //   .withMessage("WhatsApp Number is required"),
    // body("AlterNativeNumberCountryCode")
    //   .notEmpty()
    //   .withMessage("AlterNative Number Country Code is required"),
    // body("AlterNativePhoneNumber")
    //   .notEmpty()
    //   .withMessage("Alter Native Phone Number is required"),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next(); // If no validation errors, proceed to the next middleware/route handler
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" }); // If validation fails, return errors
    }
  });
};

const CustomerVendorContactValidator = (req, res, next) => {
  const validationRules = [
    body("VendorOrganizationId")
      .notEmpty()
      .withMessage("Vendor Organization Id is required"),
    body("FirstName").notEmpty().withMessage("First Name is required"),
    body("LastName").notEmpty().withMessage("Last Name is required"),
    body("Email").notEmpty().withMessage("Email is required"),
    body("Position").notEmpty().withMessage("Position is required"),
    body("Department").notEmpty().withMessage("Department is required"),
    body("PhoneNumberCountryCode")
      .notEmpty()
      .withMessage("Phone Number Country Code is required"),
    body("PhoneNumber").notEmpty().withMessage("Phone Number is required"),
    // body("WhatsAppCountryCode")
    //   .notEmpty()
    //   .withMessage("WhatsApp Country Code is required"),
    // body("WhatsAppNumber")
    //   .notEmpty()
    //   .withMessage("WhatsApp Number is required"),
    // body("AlterNativeNumberCountryCode")
    //   .notEmpty()
    //   .withMessage("AlterNative Number Country Code is required"),
    // body("AlterNativePhoneNumber")
    //   .notEmpty()
    //   .withMessage("Alter Native Phone Number is required"),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next(); // If no validation errors, proceed to the next middleware/route handler
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" }); // If validation fails, return errors
    }
  });
};

const VendorContactUpdateValidator = (req, res, next) => {
  const validationRules = [
    body("VendorContactId")
      .notEmpty()
      .withMessage("Vendor Contact Id is required For Update"),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next(); // If no validation errors, proceed to the next middleware/route handler
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" }); // If validation fails, return errors
    }
  });
};

const VendorCategoryValidator = (req, res, next) => {
  const validationRules = [
    body("TypeOfBusiness")
      .notEmpty()
      .withMessage("Type Of Business is required"),
    body("Experience").notEmpty().withMessage("Experience is required"),
    body("WorkingDays").notEmpty().withMessage("Working Days is required"),
    body("WorkingTime").notEmpty().withMessage("Working Time is required"),
    body("BiddingCategory")
      .notEmpty()
      .withMessage("Bidding Category is required"),
    body("SubCategroy").notEmpty().withMessage("Sub Category is required"),
    body("LitigationArbitrationStatus")
      .notEmpty()
      .withMessage("Litigation Arbitration Status Code is required"),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next(); // If no validation errors, proceed to the next middleware/route handler
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" }); // If validation fails, return errors
    }
  });
};

const CustomerVendorCategoryValidator = (req, res, next) => {
  const validationRules = [
    body("VendorOrganizationId")
      .notEmpty()
      .withMessage("Vendor Organization Id is required"),
    body("TypeOfBusiness")
      .notEmpty()
      .withMessage("Type Of Business is required"),
    body("Experience").notEmpty().withMessage("Experience is required"),
    body("WorkingDays").notEmpty().withMessage("Working Days is required"),
    body("WorkingTime").notEmpty().withMessage("Working Time is required"),
    body("BiddingCategory")
      .notEmpty()
      .withMessage("Bidding Category is required"),
    body("SubCategroy").notEmpty().withMessage("Sub Category is required"),
    body("LitigationArbitrationStatus")
      .notEmpty()
      .withMessage("Litigation Arbitration Status Code is required"),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next(); // If no validation errors, proceed to the next middleware/route handler
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" }); // If validation fails, return errors
    }
  });
};

const VendorCategoryUpdateValidator = (req, res, next) => {
  const validationRules = [
    body("VendorCategoryId")
      .notEmpty()
      .withMessage("Vendor Category Id is required For Update"),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next(); // If no validation errors, proceed to the next middleware/route handler
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" }); // If validation fails, return errors
    }
  });
};

const VendorBankValidator = (req, res, next) => {
  const validationRules = [
    body("BankName").notEmpty().withMessage("Bank Nameis required"),
    body("BankAccountNumber")
      .notEmpty()
      .withMessage("Bank Account Number is required"),
    body("BankAccountType")
      .notEmpty()
      .withMessage("Bank Account Type is required"),
    body("BranchLocation")
      .notEmpty()
      .withMessage("Branch Location is required"),
    body("IfsCodeOrSwiftCode")
      .notEmpty()
      .withMessage("IfsCode/SwiftCode is required"),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next(); // If no validation errors, proceed to the next middleware/route handler
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" }); // If validation fails, return errors
    }
  });
};

const CustomerVendorBankValidator = (req, res, next) => {
  const validationRules = [
    body("VendorOrganizationId")
      .notEmpty()
      .withMessage("Vendor Organization Id is required"),
    body("BankName").notEmpty().withMessage("Bank Nameis required"),
    body("BankAccountNumber")
      .notEmpty()
      .withMessage("Bank Account Number is required"),
    body("BankAccountType")
      .notEmpty()
      .withMessage("Bank Account Type is required"),
    body("BranchLocation")
      .notEmpty()
      .withMessage("Branch Location is required"),
    body("IfsCodeOrSwiftCode")
      .notEmpty()
      .withMessage("IfsCode/SwiftCode is required"),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next(); // If no validation errors, proceed to the next middleware/route handler
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" }); // If validation fails, return errors
    }
  });
};

const VendorBankUpdateValidator = (req, res, next) => {
  const validationRules = [
    body("VendorBankId").notEmpty().withMessage("Vendor Bank Id is required"),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next(); // If no validation errors, proceed to the next middleware/route handler
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" }); // If validation fails, return errors
    }
  });
};

const VendorFinanceDataValidator = (req, res, next) => {
  const validationRules = [
    body("AnnualRevenue").notEmpty().withMessage("Annual Revenue is required"),
    // body('NameofParents').notEmpty().withMessage('Name of Parents is required'),
    // body("PaymentMethod").notEmpty().withMessage("Payment Method is required"),
    body("CreditTerm").notEmpty().withMessage("Credit Term is required"),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next(); // If no validation errors, proceed to the next middleware/route handler
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" }); // If validation fails, return errors
    }
  });
};

const CustomerVendorFinanceDataValidator = (req, res, next) => {
  const validationRules = [
    body("VendorOrganizationId")
      .notEmpty()
      .withMessage("Vendor Organization Id is required"),
    body("AnnualRevenue").notEmpty().withMessage("Annual Revenue is required"),
    // body("NameofParents").notEmpty().withMessage("Name of Parents is required"),
    // body("PaymentMethod").notEmpty().withMessage("Payment Method is required"),
    body("CreditTerm").notEmpty().withMessage("Credit Term is required"),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next(); // If no validation errors, proceed to the next middleware/route handler
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" }); // If validation fails, return errors
    }
  });
};

const VendorFinanceDataUpdateValidator = (req, res, next) => {
  const validationRules = [
    body("VendorFinanceId")
      .notEmpty()
      .withMessage("Vendor Finance Id is required"),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next(); // If no validation errors, proceed to the next middleware/route handler
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" }); // If validation fails, return errors
    }
  });
};

const typesValidator = (req, res, next) => {
  const validationRules = [
    body("name").notEmpty().withMessage("Type Name is required"),
    body("description").notEmpty().withMessage("Desciption is required"),
  ];
  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next(); // If no validation errors, proceed to the next middleware/route handler
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" }); // If validation fails, return errors
    }
  });
};

const VendorCommercialDataValidator = (req, res, next) => {
  const validationRules = [
    body("MinimumAmount").notEmpty().withMessage("Minimum Amount is required"),
    body("MaximumAmount").notEmpty().withMessage("Maximum Amount is required"),
    body("LimitWorkSizeStatus")
      .notEmpty()
      .withMessage("Limit Work Size Status is required"),
    body("TrackingProcessStatus")
      .notEmpty()
      .withMessage("Tracking Process Status is required"),
    body("Projectpreference")
      .notEmpty()
      .withMessage("Projectpreference is required"),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next(); // If no validation errors, proceed to the next middleware/route handler
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" }); // If validation fails, return errors
    }
  });
};

const CustomerVendorCommercialDataValidator = (req, res, next) => {
  const validationRules = [
    body("VendorOrganizationId")
      .notEmpty()
      .withMessage("Vendor Organization Id is required"),
    body("MinimumAmount").notEmpty().withMessage("Minimum Amount is required"),
    body("MaximumAmount").notEmpty().withMessage("Maximum Amount is required"),
    body("LimitWorkSizeStatus")
      .notEmpty()
      .withMessage("Limit Work Size Status is required"),
    body("TrackingProcessStatus")
      .notEmpty()
      .withMessage("Tracking Process Status is required"),
    body("Projectpreference")
      .notEmpty()
      .withMessage("Projectpreference is required"),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next(); // If no validation errors, proceed to the next middleware/route handler
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" }); // If validation fails, return errors
    }
  });
};

const VendorCommercialDataUpdateValidator = (req, res, next) => {
  const validationRules = [
    body("VendorCommercialId")
      .notEmpty()
      .withMessage("Vendor Commercial Id is required"),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next(); // If no validation errors, proceed to the next middleware/route handler
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" }); // If validation fails, return errors
    }
  });
};

const customerTermsValidations = (req, res, next) => {
  const validationRules = [
    body("name").notEmpty().withMessage("Type Name Is Required"),
    body("description").notEmpty().withMessage("Desciption Is Required"),
    body("termAndCondition")
      .notEmpty()
      .withMessage("termAndCondition Is Required"),
    //  body('code').notEmpty().withMessage('Code Is Required'),
    body("typeId").notEmpty().withMessage("Type Id Is Required"),
  ];
  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next(); // If no validation errors, proceed to the next middleware/route handler
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" }); // If validation fails, return errors
    }
  });
};

const shippingMethodsValidations = (req, res, next) => {
  const validationRules = [
    body("name").notEmpty().withMessage("Type Name Is Required"),
    body("description").notEmpty().withMessage("Desciption Is Required"),
    body("typeId").notEmpty().withMessage("Type Id Is Required"),
  ];
  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next(); // If no validation errors, proceed to the next middleware/route handler
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" }); // If validation fails, return errors
    }
  });
};

const VendorSupplierQualityValidator = (req, res, next) => {
  const validationRules = [
    body("CertifiedForQualityStatus")
      .notEmpty()
      .withMessage("Certified For Quality Status is required"),
    body("LaboratoryAccreditation")
      .notEmpty()
      .withMessage("Laboratory Accreditation is required"),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next(); // If no validation errors, proceed to the next middleware/route handler
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" }); // If validation fails, return errors
    }
  });
};

const VendorDocumentValidator = (req, res, next) => {
  const validationRules = [
    body("DocumentType").notEmpty().withMessage("Document Type is required"),
    body("DocumentNumber")
      .notEmpty()
      .withMessage("Document Number is required"),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next(); // If no validation errors, proceed to the next middleware/route handler
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" }); // If validation fails, return errors
    }
  });
};

const VendorDocumentUpdateValidator = (req, res, next) => {
  const validationRules = [
    body("VendorDocumentId")
      .notEmpty()
      .withMessage("Vendor Document Id is required"),
    body("DocumentType").notEmpty().withMessage("Document Type is required"),
    body("DocumentNumber")
      .notEmpty()
      .withMessage("Document Number is required"),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next(); // If no validation errors, proceed to the next middleware/route handler
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" }); // If validation fails, return errors
    }
  });
};

const CustomerVendorDocumentValidator = (req, res, next) => {
  const validationRules = [
    body("VendorOrganizationId")
      .notEmpty()
      .withMessage("Vendor Organization Id is required"),
    body("DocumentType").notEmpty().withMessage("Document Type is required"),
    body("DocumentNumber")
      .notEmpty()
      .withMessage("Document Number is required"),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next(); // If no validation errors, proceed to the next middleware/route handler
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" }); // If validation fails, return errors
    }
  });
};

const CustomerVendorRegistrationConfirmationValidation = (req, res, next) => {
  const validationRules = [
    body("VendorOrganizationId")
      .notEmpty()
      .withMessage("Vendor Organization Id is required"),
  ];
  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next(); // If no validation errors, proceed to the next middleware/route handler
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" }); // If validation fails, return errors
    }
  });
};

const CustomerVendorSupplierQualityValidator = (req, res, next) => {
  const validationRules = [
    body("VendorOrganizationId")
      .notEmpty()
      .withMessage("Vendor Organization Id is required"),
    body("CertifiedForQualityStatus")
      .notEmpty()
      .withMessage("Certified For Quality Status is required"),
    body("LaboratoryAccreditation")
      .notEmpty()
      .withMessage("Laboratory Accreditation is required"),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next(); // If no validation errors, proceed to the next middleware/route handler
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" }); // If validation fails, return errors
    }
  });
};

const VendorSupplierQualityUpdateValidator = (req, res, next) => {
  const validationRules = [
    body("VendorSupplierId")
      .notEmpty()
      .withMessage("Vendor Supplier Id is required"),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next(); // If no validation errors, proceed to the next middleware/route handler
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" }); // If validation fails, return errors
    }
  });
};

const customerUOMValidations = (req, res, next) => {
  const validationRules = [
    body("name").notEmpty().withMessage("Type Name Is Required"),
    body("description").notEmpty().withMessage("Desciption Is Required"),
    body("code").notEmpty().withMessage("Code Is Required"),
    body("typeId").notEmpty().withMessage("Type Id Is Required"),
  ];
  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next(); // If no validation errors, proceed to the next middleware/route handler
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" }); // If validation fails, return errors
    }
  });
};

const budgetPeriodValidations = (req, res, next) => {
  const validationRules = [
    body("name").notEmpty().withMessage("Type Name Is Required"),
    // body("description").notEmpty().withMessage("Desciption Is Required"),
    body("code").notEmpty().withMessage("Code Is Required"),
    body("typeId").notEmpty().withMessage("Type Id Is Required"),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next(); // If no validation errors, proceed to the next middleware/route handler
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" }); // If validation fails, return errors
    }
  });
};

const typesValidatorV2 = (req, res, next) => {
  const validationRules = [
    body("name").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Desciption is required"),
    body("moduleType").notEmpty().withMessage("Type is required"),
  ];
  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next(); // If no validation errors, proceed to the next middleware/route handler
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" }); // If validation fails, return errors
    }
  });
};

const termValidations = (req, res, next) => {
  const validationRules = [
    body("name").notEmpty().withMessage("Type Name Is Required"),
    body("description").notEmpty().withMessage("Desciption Is Required"),
    body("termAndCondition")
      .notEmpty()
      .withMessage("Term & Condition Is Required"),
    body("typeId").notEmpty().withMessage("Type Id Is Required"),
  ];

  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next(); // If no validation errors, proceed to the next middleware/route handler
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" }); // If validation fails, return errors
    }
  });
};

const validateFieldsCommon = (...fields) => {
    console.log(fields)
  return async (req, res, next) => {
    console.log(req.body)
    const validationRules = fields.map((field) =>
      body(field).notEmpty().withMessage(`Please provide ${field}`)
    );
    await Promise.all(validationRules.map((rule) => rule.run(req)));

    const errors = validationResult(req);

    if (errors.isEmpty()) {
      next();
    } else {
      res.status(422).json({ errors: errors.array(), message: "Invalid Data" });
    }
  };
};

module.exports = {
  prGroupValidations,
  quotationValidations,
  purchaseRequestValidations,
  purchaseOrderValidations,
  purchaseOrderValidationsForPrCreation,
  userValidations,
  InvoiceValidations,
  roleValidations,
  receiptValidations,
  organizationValidations,
  productValidations,
  CustomerDeliveryValidations,
  CustomerApprovalCreationValidations,
  CutomerApproveRejectRequestValidation,
  quotationValidationsV2,
  CoaOrganizationValidator,
  VendorUserLoginValidator,
  VendorUserOrganizationValidator,
  VendorApproveRejectValidator,
  CustomerVendorUserUpdateOrganizationValidator,
  CustomerVendorUserOrganizationValidator,
  VendorUserUpdateOrganizationValidator,
  VendorUserUpdateOrganizationValidatorFromData,
  VendorContactValidator,
  CustomerVendorContactValidator,
  VendorContactUpdateValidator,
  VendorCategoryValidator,
  CustomerVendorCategoryValidator,
  VendorCategoryUpdateValidator,
  VendorBankValidator,
  CustomerVendorBankValidator,
  VendorBankUpdateValidator,
  VendorFinanceDataValidator,
  CustomerVendorFinanceDataValidator,
  VendorFinanceDataUpdateValidator,
  VendorCommercialDataValidator,
  CustomerVendorCommercialDataValidator,
  VendorCommercialDataUpdateValidator,
  VendorSupplierQualityValidator,
  CustomerVendorSupplierQualityValidator,
  VendorSupplierQualityUpdateValidator,
  typesValidator,
  customerTermsValidations,
  customerUOMValidations,
  budgetPeriodValidations,
  termValidations,
  typesValidatorV2,
  typesValidatorV2,
  shippingMethodsValidations,
  VendorDocumentValidator,
  VendorDocumentUpdateValidator,
  CustomerVendorDocumentValidator,
  CustomerVendorRegistrationConfirmationValidation,
  validateFieldsCommon,
};