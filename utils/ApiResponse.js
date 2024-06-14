const { StatusCodes } = require("http-status-codes");
const Messages = require("./messages");
let dataEnpDep = require("../utils/EncryptionDecryption");

function baseResponse(
    res,
    success,
    data,
    message = null,
    error = null,
    statuscode = StatusCodes.OK
) {
    const response = {
        success,
        data,
    };

    if (message) {
        response.message = message;
    }
    if (error) {
        response.error = error;
    }
    return res.status(statuscode).json(response);
}

function saveResponse(res, entitySaveData, message = Messages.EntityCreated) {
    baseResponse(
        res,
        true,
        entitySaveData,
        {
            message,
            statuscode: StatusCodes.CREATED,
        },
        null,
        StatusCodes.CREATED
    );
}

function updateResponse(res, updateEntityData, message = Messages.EntityUpdated) {
    baseResponse(
        res,
        true,
        updateEntityData,
        {
            message,
            statuscode: StatusCodes.OK,
        },
        null,
        StatusCodes.OK
    );
}

function deleteResponse(res, message = Messages.EntityDeleted) {
    baseResponse(
        res,
        true,
        {},
        {
            message,
            statuscode: StatusCodes.OK,
        },
        null,
        StatusCodes.OK
    );
}

function serverIssueResponse(res, error) {
    baseResponse(
        res,
        false,
        {},
        {
            message: Messages.InternalServerError,
            statuscode: StatusCodes.INTERNAL_SERVER_ERROR,
        },
        error !== undefined ? error.message : null,
        StatusCodes.INTERNAL_SERVER_ERROR
    );
}

function entityNotAvailable(res, message = Messages.EntityNotAvailable) {
    baseResponse(
        res,
        false,
        {},
        {
            message,
            statuscode: StatusCodes.BAD_REQUEST,
        },
        null,
        StatusCodes.BAD_REQUEST
    );
}

function badRequestResponse(res, message = Messages.BadResponse) {
    baseResponse(
        res,
        false,
        {},
        {
            message,
            statuscode: StatusCodes.BAD_REQUEST,
        },
        null,
        StatusCodes.BAD_REQUEST
    );
}

function foreignKeyConstraintError(res, message = Messages.ForeignKeyConstraintError) {
    baseResponse(
        res,
        false,
        {},
        {
            message,
            statuscode: StatusCodes.BAD_REQUEST,
        },
        null,
        StatusCodes.BAD_REQUEST
    );
}

async function sendDataResponse(res, data, message = Messages.EntityFetched) {
    baseResponse(
        res,
        true,
        data,
        {
            message,
            statuscode: StatusCodes.OK,
        },
        null,
        StatusCodes.OK
    );
}

async function sendEncryptionDataResponse(res, data, message = Messages.EntityFetched) {
    data = await dataEnpDep.encryptedData(data);
    baseResponse(
        res,
        true,
        data,
        {
            message,
            statuscode: StatusCodes.OK,
        },
        null,
        StatusCodes.OK
    );
}

function invalidCredentialResponse(res, message = Messages.InvalidCredentials) {
    baseResponse(
        res,
        false,
        {},
        {
            message,
            statuscode: StatusCodes.BAD_REQUEST,
        },
        null,
        StatusCodes.BAD_REQUEST
    );
}

function entityAlreadyExists(res, message = Messages.EntityExists) {
    baseResponse(
        res,
        false,
        {},
        { message, statuscode: StatusCodes.CONFLICT },
        null,
        StatusCodes.CONFLICT
    );
}

function unAuthorizedResponse(res) {
    baseResponse(
        res,
        false,
        {},
        {
            message: Messages.Forbidden,
            statuscode: StatusCodes.FORBIDDEN,
        },
        null,
        StatusCodes.FORBIDDEN
    );
}

function validationsResponse(res, errorsArray) {
    baseResponse(
        res,
        false,
        {},
        {
            message: Messages.InvalidData,
            statuscode: StatusCodes.UNPROCESSABLE_ENTITY,
        },
        {
            errorsArray,
        },
        StatusCodes.UNPROCESSABLE_ENTITY
    );
}

function organisationExist(res) {
    baseResponse(
        res,
        false,
        {},
        { message: Messages.OrganisationExist },
        null,
        StatusCodes.CONFLICT
    );
}

function sendValidationError(res,data,message = Messages.FormValidationError) {
    baseResponse(
        res,
        false,
        data,
        {
            message,
            statuscode: StatusCodes.BAD_REQUEST,
        },
        null,
        StatusCodes.BAD_REQUEST
    );
}

function handleServerError(res,message = Messages.InternalServerError,error='') {
    baseResponse(
        res,
        false,
        {
            message:message==''?Messages.InternalServerError:message,
            statuscode: StatusCodes.BAD_REQUEST,
        },
        error !== undefined ||  error !== ''? error.message : null,
        StatusCodes.INTERNAL_SERVER_ERROR
    );
}

module.exports = {
    baseResponse,
    saveResponse,
    updateResponse,
    deleteResponse,
    serverIssueResponse,
    entityNotAvailable,
    sendDataResponse,
    sendEncryptionDataResponse,
    invalidCredentialResponse,
    entityAlreadyExists,
    unAuthorizedResponse,
    validationsResponse,
    organisationExist,
    foreignKeyConstraintError,
    badRequestResponse,
    sendValidationError,
    handleServerError,
};
