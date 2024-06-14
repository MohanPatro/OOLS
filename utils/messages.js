const Messages = {
  // Server Issue Messages
  InternalServerError: "Access denied: Please contact your administrator.",
  // JWT Messages
  UnableToCreateJWTToken: "Unable to create a JWT token.",
  InvalidJWTToken: "Invalid JWT token.",
  JWTTokenRequired: "Please provide a JWT token.",
  Forbidden: "You do not have permission to access this module.",
  CountryStateCityCombination:
    "The country, state, and city combination is incorrect. Please check the values.",
  ProvideFiles: "Please provide a file to save data",
  ExcelFileValidation: "Please provide excel or csv file.",
  // Customer Controller messages for customer login APIs, etc.
  SuperOrganizationAPis: {
    OrganizationEmailAlreadyExist:
      "Organization email already exists. Please try with another email.",
    OrganizationCreateFail: "Unable to save the organization.",
    OrganizationCreateSuccess: "Records saved successfully.",
  },
  CustomerUserApis: {
    CustomerTestApiResponseMessage: "Customer test API ran successfully.",
    CustomerTryCatchLogMessage: "Customer login APIs.",
    CustomerEmailAlreadyExist:
      "A user already exists for the given email address.",
    CustomerTryCatchApiResponseMessage:
      "Access denied. Please contact the administrator.",
    CustomerLoginSuccess: "Login successful.",
    CustomerUserNameNotFound: "Please enter the correct username.",
    CustomerUserPasswordIncorrect:
      "Incorrect password. Please use a different password.",
    CustomerLoginFail: "Something went wrong. Please try again.",
    CustomerSaveSuccess: "Records saved successfully.",
    CustomerSaveFail: "Unable to save records.",
    CustomerLoginFail: "Unable to log in.",
    CustomerAPisFormValidationError: "Some keys are missing. Please check.",
    CustomerRoleIsNotExist: "Role does not exist. Please check.",
    CustomerUserNotExist: "User does not exist. Please try another user.",
    CustomerOrganizationConfigNotExist:
      "Organization configuration does not exist. Please check.",
    CustomerOtpSendSuccess: "OTP sent successfully.",
    CustomerResendOtpNotAllowed:
      "Resending OTP is not allowed. Please initiate a password reset first.",
    CustomerOtpNotMatched: "OTP did not match. Please try another OTP.",
    CustomerPasswordUpdateSuccess: "Password updated successfully.",
  },
  SettingModuleApis: {
    SettingProfileGetSuccess: "Profile loaded successfully.",
    SettingProfileGetFail: "Unable to load profile data.",
    SettingProfileUserNotExists: "User not found.",
    SettingProfileUpdateSuccess: "Profile records updated.",
    SettingProfileUpdateFail: "Failed to update profile records.",
    SettingProfileUserImageUpdateSuccess: "Profile image updated successfully.",
    SettingOrganizationGetSuccess: "Records loaded successfully.",
    SettingOrganizationLogoUpdateSuccess:
      "Organization logo updated successfully.",
    SettingOrganizationUpdateSuccess:
      "Organization record updated successfully.",
    SettingOrganizationUpdateFail: "Failed to update organization record.",
    SettingOrganizationNotExists: "Organization records not found.",
    SettingOrganizationDeliveryAddressUpdateSuccess:
      "Delivery address updated successfully.",
    SettingOrganizationDeliveryAddressSaveSuccess:
      "Delivery address saved successfully.",
    SettingOrganizationDeliveryAddressUpdateFail:
      "Failed to update delivery address.",
    SettingOrgDocumentUploadedSuccess: "Document uploaded successfully.",
    SettingOrgDocumentSaveSuccess: "Document saved successfully.",
    SettingOrgDocumentDeleteSuccess: "Document deleted successfully.",
    SettingOrgDocumentNotExist: "Document does not exist.",
    SettingOrgDocumentUploadedFail: "Failed to upload document.",
    SettingOrgDocumentGetSuccess: "Records loaded successfully.",
    SettingProfilePasswordUpdatedSuccess: "Password updated successfully.",
    SettingProfilePasswordUpdatedFail: "Failed to update password.",
    SettingProfilePasswordValidation:
      "Please check password pattern (minimum 8 characters) or ensure that password and confirm password match.",
    CountryStateCityCombination:
      "The organization's country, state, and city combination is incorrect. Please check the values.",
    SettingOrganizationBillingAddressGetSuccess:
      "Billing address records loaded successfully.",
    SettingOrganizationDeliveryAddressGetSuccess:
      "Delivery address records loaded successfully.",
  },
  // Entities Success Messages
  EntityNotAvailable: "Access Denied: Please contact your administrator.", //"No data is associated with the given ID",
  FormValidationError: "Validation error.", //"No data is associated with the given ID",
  EntityCreated: "Data saved successfully.",
  EntityDeleted: "Data deleted successfully.",
  EntityUpdated: "Data updated successfully.",
  EntityFetched: "Data fetched successfully.",

  InvalidCredentials: "Invalid email or password.",
  LoginSuccessful: "User login successful.",

  // Entities Error Messages
  EntityExists: "Access Denied: Please contact your administrator.", //"An entity is already associated with the given ID",
  UnableToSaveEntity: "Unable to save data.",
  UnableToGetEntity: "Unable to fetch data.",
  UnableToUpdateEntity: "Unable to update data.",
  UnableToDeleteEntity: "Unable to delete data.",
  UnableToGetEntityById: "Unable to get data by ID.",
  ForeignKeyConstraintError:
    "Access Denied: Please contact your administrator.", //"Please provide valid values for selected IDs",

  // Validation Messages
  InvalidEmail: "Please provide a valid email address.",
  InvalidPassword: "Please provide a password in a valid format.",
  InvalidPasswordConfirmPassword: "Password and confirm password do not match.",
  InvalidData: "Please provide valid data or data is not in a valid format.",
  IdRequired: "Please provide an ID.",
  PositiveValuesRequired: "Please provide a value greater than or equal to 0.",
  BadResponse:
    "Provide valid values or you are not allowed to use the given values.",
  IdsRequired: "Please provide an ids .",


  InvalidDate: "Please Provide Valid Dates",
  SubCategoryExistForName: "Sub-category name already exists",
  CategoryExistForSameName: "Category name already exists",
  UomTypeNotExists: "UOM Type Does Not Exist",
  CodeExist: "The Given Code Is Aleready Used",
  UOMExits: "UOM name already exists",
  ShipingMethodTypeNotExists: "Shipping Method Type Does Not Exist",
  ShppingNameExists: "Shipping name exists",
  TermsTypeNotExists: "Term Type Does Not Exist",
  TermsExists: "Term already exists",
  TermsTypeExists: "Term type already exists",
  PaymentShippingNameValidation: "You are not allowed to used the given title",
  PaymentShippingNameValidationForUpdate:
    "You are not allowed update the system generated data",
  BudgetPeriodTypeNotExists: "Type Does Not Exist",
  BudgetPeriodExists: "Budget period already exists",
  CoaAlereadyExists: "COA already exists",
  ProductTypeExist: "Product type already exists",

  // Required Messages
  EmailRequired: "Email address is required.",
  PasswordRequired: "Password is required.",
  ConfirmPasswordRequired: "Confirm password is required.",
  NameRequired: "Name is required.",
  PhoneNumberRequired: "Phone number is required.",
  CountryRequired: "Country is required.",
  StateRequired: "State is required.",
  CityRequired: "City is required.",
  ZipRequired: "Zip code is required.",
  CompanyNameRequired: "Company name is required.",
  DepartmentRequired: "Department is required.",
  PositionRequired: "Position is required.",
  RoleRequired: "Role is required.",
  ModuleAccessRequired: "Module access is required.",

  OrganisationExist:
    "An organization with this name already exists. Please try another name.",
  OrganisationRequired: "Organization name is required.",
  RoleExisted: "The role you are creating already exists.",
  RoleNotAllowed: "You are not allowed to create this role.",
  AdminUserCreationValidation:
    "Regular users can create only other regular users, not Administrators.",
  AdminUserUpdationValidation:
    "Regular users can update only other regular users, not Administrators.",
  
    AdminUserUpdationValidation2:
    "You are not allowed to update the system generated user",
  AdminUserDeletionValidation:
    "Regular users can delete only other regular users, not Administrators.",
  RoleNotExist: "The role does not exist.",
  CustomerSideVendorRegistrationApis: {
    RoleNotSaved: "Unable to save vendor role.",
    FirstPageGeneralInfoSave: "General information saved successfully.",
    FirstPageEmailCheck:
      "Email ID is already registered with another vendor. Please use a different email ID.",
    NotRegisterFirstPageCheckOrganizationInfo:
      "Not registered. Please try again.",
    CountryStateCityCheck:
      "The country, state, city combination is incorrect. Please check.",
    UpdateOrganizationSuccess: "Organization records updated successfully.",
    UpdateOrganizationFail: "Failed to update organization records.",
    GetOrganizationInfoSuccess: "Organization information loaded successfully.",
    OrganizationNotExist: "Organization does not exist.",
    GetAllVendorListSuccess: "Vendor list loaded successfully.",
    CustomerApproveVendor: "Vendor approved successfully.",
    CustomerRejectVendor: "Vendor rejected successfully.",
    CustomerOrganizationCheck:
      "Your organization does not exist. Please check your login ID.",
    RejectCountReached:
      "Rejection count reached. Unable to reject. Please review and approve.",
    VendorContactSaveSuccess: "Vendor contact information saved successfully.",
    VendorContactEmailCheck: "Email already exists. Please try another email.",
    UpdateVendorContactSuccess:
      "Vendor contact information updated successfully.",
    UpdateVendorContactFail: "Failed to update vendor contact information.",
    GetVendorContactSuccess: "Vendor contact information loaded successfully.",
    VendorOrganizationIDMissing:
      "Please use query parameters with VendorOrganizationId.",
    DeleteCustomerVendorContactDataSuccess: "Contact deleted successfully.",
    ContactNotAvailable: "Contact not available. Please check.",
    GetAllContactInfoSuccess: "All contact information loaded successfully.",
    CategorySavedSuccess: "Category information saved successfully.",
    CategorySavedFail: "Failed to save category information. Please try again.",
    UpdateVendorCategorySuccess:
      "Vendor category information updated successfully.",
    UpdateVendorCategoryFail: "Failed to update vendor category information.",
    GetVendorCategorySuccess:
      "Vendor category information loaded successfully.",
    VendorBankSavedSuccess: "Bank information saved successfully.",
    VendorBankAccountCheck:
      "Account number already exists. Please try another.",
    VendorBankUpdateSuccess: "Bank information updated successfully.",
    VendorBankUpdateFail: "Failed to update bank information.",
    GetVendorBankInfoSuccess: "Bank information loaded successfully.",
    GetVendorAllBankInfoSuccess: "All bank information loaded successfully.",
    FinanceDataSaveSuccess: "Finance data saved successfully.",
    FinanceDataSaveFail: "Failed to save finance data.",
    FinanceDataUpdateSuccess: "Finance data updated successfully.",
    FinanceDataUpdateFail: "Failed to update finance data.",
    FinanceDataGetSuccess: "Finance data loaded successfully.",
    FinanceDataGetAllSuccess: "All finance data loaded successfully.",
    CommercialDataSaveSuccess: "Commercial data saved successfully.",
    CommercialDataSaveFail: "Failed to save commercial data.",
    CommercialDataUpdateSuccess: "Commercial data updated successfully.",
    CommercialDataUpdateFail: "Failed to update commercial data.",
    CommercialDataGetSuccess: "Commercial data loaded successfully.",
    CommercialDataGetAllSuccess: "All commercial data loaded successfully.",
    SupplierQualityDataSaveSuccess: "Supplier quality data saved successfully.",
    SupplierQualityDataSaveFail: "Failed to save supplier quality data.",
    SupplierQualityDataUpdateSuccess:
      "Supplier quality data updated successfully.",
    SupplierQualityDataUpdateFail: "Failed to update supplier quality data.",
    SupplierQualityDataGetSuccess: "Supplier quality data loaded successfully.",
    SupplierQualityDataGetAllSuccess:
      "All supplier quality data loaded successfully.",
    DocumentsDataSaveSuccess: "Documents data saved successfully.",
    DocumentsDataSaveFail: "Failed to save documents data.",
    DocumentsDataFileValidation: "Please select a file.",
    DocumentsDataUpdateSuccess: "Documents data updated successfully.",
    DocumentsDataUpdateFail: "Failed to update documents data.",
    DocumentsDataGetSuccess: "Documents data loaded successfully.",
    DocumentsDataGetAllSuccess: "All documents data loaded successfully.",
    DocumentsDataDeleteSuccess: "Documents data deleted successfully.",
    DocumentsDataDeleteFail: "Failed to delete documents data.",
    ConfirmRegistrationDataSaveSuccess:
      "Confirm registration data saved successfully.",
    ConfirmRegistrationDataSaveFail:
      "Failed to save confirm registration data.",
    VendorDeleteSuccess: "Vendor deleted successfully.",
    VendorDeleteFail: "Failed to delete vendor.",
  },
  VendorSideVendorRegistrationApis: {
    VendorLoginAccessDenied: "Access denied. Please contact the support team.",
    VendorLoginPasswordNotMatch: "Password not matched. Please try again.",
    VendorUserNotExist: "User does not exist. Please try another login.",
    RoleNotSaved: "Unable to save vendor role.",
    OrganizationGeneralInfoSaveSuccess:
      "General information saved successfully.",
    OrganizationGeneralInfoSaveFail: "Failed to save general information.",
    OrganizationGeneralInfoUpdateSuccess:
      "General information updated successfully.",
    OrganizationGeneralInfoUpdateFail: "Failed to update general information.",
    OrganizationGeneralInfoGetSuccess:
      "General information loaded successfully.",
    OrganizationGeneralInfoGetAllSuccess:
      "All general information loaded successfully.",
    OrganizationGeneralInfoGetNotAllowedRegistration:
      "Registration not allowed.",
    OrganizationGeneralInfoVendorEmailCheck:
      "Email ID is already registered with another vendor. Please try using a different email ID.",
    CountryStateCityCheck:
      "The country, state, city combination is incorrect. Please check.",
    OrganizationNotExist: "Organization does not exist.",
    CustomerOrganizationCheck:
      "Your organization does not exist. Please check your login ID.",
    ContactEmailCheck: "Email already exists. Please try another email.",
    ContactSaveSuccess: "Contact information saved successfully.",
    ContactSaveFail: "Failed to save contact information.",
    ContactUpdateSuccess: "Contact information updated successfully.",
    ContactUpdateFail: "Failed to update contact information.",
    ContactGetSuccess: "Contact information loaded successfully.",
    ContactGetAllSuccess: "All contact information loaded successfully.",
    ContactNotAvailable: "Contact not available. Please check.",
    VendorOrganizationIDMissing:
      "Please use query parameters with VendorOrganizationId.",
    CategorySaveSuccess: "Category information saved successfully.",
    CategorySaveFail: "Failed to save category information.",
    CategoryUpdateSuccess: "Category information updated successfully.",
    CategoryUpdateFail: "Failed to update category information.",
    CategoryGetSuccess: "Category information loaded successfully.",
    CategoryGetAllSuccess: "All category information loaded successfully.",
    CategorySaveFailAlreadyExist: "Category already exists.",
    VendorBankAccountCheck:
      "Account number already exists. Please try another.",
    VendorBankSaveSuccess: "Bank information saved successfully.",
    VendorBankSaveFail: "Failed to save bank information.",
    VendorBankUpdateSuccess: "Bank information updated successfully.",
    VendorBankUpdateFail: "Failed to update bank information.",
    VendorBankGetSuccess: "Bank information loaded successfully.",
    VendorBankGetAllSuccess: "All bank information loaded successfully.",
    FinanceDataSaveSuccess: "Finance data saved successfully.",
    FinanceDataSaveFail: "Failed to save finance data.",
    FinanceDataUpdateSuccess: "Finance data updated successfully.",
    FinanceDataUpdateFail: "Failed to update finance data.",
    FinanceDataGetSuccess: "Finance data loaded successfully.",
    FinanceDataGetAllSuccess: "All finance data loaded successfully.",
    CommercialDataSaveSuccess: "Commercial data saved successfully.",
    CommercialDataSaveFail: "Failed to save commercial data.",
    CommercialDataUpdateSuccess: "Commercial data updated successfully.",
    CommercialDataUpdateFail: "Failed to update commercial data.",
    CommercialDataGetSuccess: "Commercial data loaded successfully.",
    CommercialDataGetAllSuccess: "All commercial data loaded successfully.",
    SupplierQualityDataSaveSuccess: "Supplier quality data saved successfully.",
    SupplierQualityDataSaveFail: "Failed to save supplier quality data.",
    SupplierQualityDataUpdateSuccess:
      "Supplier quality data updated successfully.",
    SupplierQualityDataUpdateFail: "Failed to update supplier quality data.",
    SupplierQualityDataGetSuccess: "Supplier quality data loaded successfully.",
    SupplierQualityDataGetAllSuccess:
      "All supplier quality data loaded successfully.",
    DocumentsDataSaveSuccess: "Documents data saved successfully.",
    DocumentsDataSaveFail: "Failed to save documents data.",
    DocumentsDataFileValidation: "Please select a file.",
    DocumentsDataUpdateSuccess: "Documents data updated successfully.",
    DocumentsDataUpdateFail: "Failed to update documents data.",
    DocumentsDataGetSuccess: "Documents data loaded successfully.",
    DocumentsDataGetAllSuccess: "All documents data loaded successfully.",
    DocumentsDataDeleteSuccess: "Documents data deleted successfully.",
    DocumentsDataDeleteFail: "Failed to delete documents data.",
    ConfirmRegistrationDataSaveSuccess:
      "Confirm registration data saved successfully.",
    ConfirmRegistrationDataSaveFail:
      "Failed to save confirm registration data.",
    VendorDeleteSuccess: "Vendor deleted successfully.",
    VendorDeleteFail: "Failed to delete vendor.",
    ReApprovalSuccess: "Re-approval forwarded to Customer successfully.",
    ReApprovalFail: "Re-approval update failed.",
    ReApprovalReached:
      "You have reached the maximum number of re-approval processes.",
  },
  VendorSettingApis: {
    GetVendorUserProfileSuccess: "User profile loaded successfully.",
  },

  VendorResetPasswordMessages: {
    ErrorMessage: "Something went wrong.",
    InsufficientData: "Insufficient data.",
    AccountNotExist: "Account does not exist. Please sign up first.",
    ForgotPasswordOTPSubject: "Forgot Password OTP",
    OtpMessage: "OTP sent successfully.",
    ResendOTPError:
      "Resending OTP is not allowed. Please initiate the password reset.",
    OtpMisMatched: "OTP does not match. Please try again.",
    OtpMatched: "OTP verified successfully.",
    OTPNotVerified: "OTP not verified. Please request another OTP.",
    PasswordUpdated: "Password updated successfully.",
  },

  EmailCronApis: {
    IncompleteMailSend: "Email sent successfully.",
  },

  NonRegisterVendorAPis: {
    VendorRegisterUniqueEmailFail: "Email ID already exists.",
    VendorRegisterSuccess: "Vendor registration successful.",
    VendorRegisterFail: "Failed to register vendor.",
    VendorRegisterEmailAlreadyExist:
      "Email ID already exists, please try another email ID.",
    VendorGetSingleInfoSuccess: "Vendor information loaded successfully.",
    VendorGetAllListNonRegisterSuccess:
      "All vendor information loaded successfully.",
    VendorInfoUpdateSuccess: "Vendor information updated successfully.",
    VendorInfoUpdateFail: "Failed to update vendor information.",
    VendorListPrCreationSuccess: "Vendor list loaded successfully.",
    VendorDeleteFail: "Failed to delete vendor.",
    VendorDeleteSuccess: "Vendor deleted successfully.",
    NotExist: "Does not exist.",
  },

  ProjectNameAndNumberAPis: {
    ProjectNameAndNumberCreationSuccess:
      "Project name and number created successfully.",
    ProjectNameAndNumberCreationFail:
      "Failed to create project name and number.",
    ProjectNameAndNumberUpdateSuccess:
      "Project name and number updated successfully.",
    ProjectNameAndNumberUpdateFail: "Failed to update project name and number.",
    ProjectNameAlreadyExistError: "Project name already exists.",
    ProjectNumberAlreadyExitError: "Project number already exists.",
    ProjectNameAndNumberGetSuccess: "Project list loaded successfully.",
    ProjectNameAndNumberGetFail: "Failed to load project list.",
    ProjectAssignedNotExist:
      "Project assigned to the user does not exist for this organization.",
    ProjectNameAndNumberCombinationExists:
      "The combination of project name and number already exists. Please try a different one.",
  },

  RfqAPis: {
    RfqTestAPiResponseMessage: "RFQ test API ran successfully.",
    RfqTryCatchErrorResponseMessage:
      "Access denied. Please contact the administrator.",
    RfqProjectDetailsWithPrLoadedSuccess:
      "Project details with RFQ loaded successfully.",
    RfqCreationSuccessMessage: "RFQ created successfully.",
    RfqCreationFailedMessage: "Failed to create RFQ.",
    RfqListGetFailMessage: "Failed to load RFQ list.",
    RfqListGetSuccessMessage: "RFQ list loaded successfully.",
    RfqDetailsGetSuccessMessage: "RFQ details loaded successfully.",
    RfqDetailsGetFailMessage: "RFQ details not found.",
    RfqCustomerOrgValidationMessage: "Organization does not exist.",
    RfqPleaseProvidePrIdsAsArray: "Please provide pr ids in array format.",
    RfqPleaseProvideVendorIdsAsArray:
      "Please provide vendor ids in array format.",
    DeletePrResponse: "Purchase requesitions removed successfully.",
    RfqNtExistOrNotInDraftStage: "Rfq does not exist , Or aleready sent",
    VendorAlereadyOpened: "Vendor already opened the rfq",
    EndEventBadResponse: "Event is not open or ongoing",
    EndEventResponse: "Event successfully completed",
    QuotationSubmissionEventClose:
      "Unable to submit the quotation as rfq event for the pr is ended",
    ProjectIdNotExists: "Project id not exists.",
    DeliveryAddresNotFound:
      "Please insert atleast one shipping address as it required in the RFQ AI generation",
    PrListEmptyForProjectId:
      "Unable to create rfq as there is no pr is asscoiated with given project",
  },

  TaxModuleMessages: {
    TaxExists: "Tax name already exists. Please provide a different name.",
    ProvideTaxIds: "Please provide tax IDs.",
  },

  VendorUserModules: {
    VendorUserEmailAlreadyExist: "Email Id already exists.",
    VendorUserRoleValidation: "Please provide role Id, Or Role not exists.",
    VendorUserSaveSuccess: "Records saved.",
    VendorUserSaveFail: "Records not saved.",
    VendorUserIdValidation: "Please provide vendor Id.",
    VendorUserNotExists: "User not exists.",
    VendorUserUpdateSuccess: "Records updated.",
    VendorUserUpdateFail: "Records not updated.",
    VendorUserGetAllSuccess: "Records loaded success.",
  },

  EmailSubjects: {
    QuotationSubmissionCustomerEmail:
      "New Quotation Submitted by Vendor for PR",
    SoftwareName: "ConQT VMS",
    VendroUserAndPassSubject: "Welcome to ConQT Vendor Management Software",
  },

  PrGroupMessages: {
    PrGroupExists: "Purchasing group already exists.",
    PrGroupSaved: "Purchasing group has been saved successfully.",
    PrGroupDataFetched: "Purchasing group data fetched successfully.",
    PrGroupCategoryValidation: `Purchasing group category must be 'Goods', 'Service', 'Others' or 'Project'.`,
    PrGroupNotExists: "The purchasing group does not exist.",
    PrGroupAlereadyReleased:
      "The purchasing group is already released, you are not allowed to update it.",
    PrGroupUpdated: "The purchasing group has been updated successfully.",
    PrGroupAssigned:
      "The purchasing group is assigned with a Purchase Requisition, you are not allowed to delete it.",
    PrGroupDeleted: "The purchasing group has been deleted successfully.",
    UnableToDeletePr: "Unable to delete purchasing group.",
  },

  // Table Alter Value
  tableAlter: false,
};
module.exports = Messages;
