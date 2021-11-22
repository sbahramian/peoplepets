import { object, array, string, number } from "yup";
import translate from '@resources/translate';

const addPayload = {

    body: object({

        firstname: string()
            .required(translate.__("error.middleware.validator.schema.MISSING_REQUIRED_CONTENT", "People firstname"))
            .typeError(translate.__("error.middleware.validator.schema.TYPE_ERROR", "People firsname", "string")),

        lastname: string()
            .required(translate.__("error.middleware.validator.schema.MISSING_REQUIRED_CONTENT", "People lastname"))
            .typeError(translate.__("error.middleware.validator.schema.TYPE_ERROR", "People lastname", "string")),

        phoneNumber: string()
            .required(translate.__("error.middleware.validator.schema.MISSING_REQUIRED_CONTENT", "People phone number"))
            .typeError(translate.__("error.middleware.validator.schema.TYPE_ERROR", "People phone number", "string")),

        address: string()
            .required(translate.__("error.middleware.validator.schema.MISSING_REQUIRED_CONTENT", "People address"))
            .typeError(translate.__("error.middleware.validator.schema.TYPE_ERROR", "People address", "string")),

    })

};

const updatePayload = {

    body: object({

        firstname: string()
            .required(translate.__("error.middleware.validator.schema.MISSING_REQUIRED_CONTENT", "People firstname"))
            .typeError(translate.__("error.middleware.validator.schema.TYPE_ERROR", "People firsname", "string")),

        lastname: string()
            .required(translate.__("error.middleware.validator.schema.MISSING_REQUIRED_CONTENT", "People lastname"))
            .typeError(translate.__("error.middleware.validator.schema.TYPE_ERROR", "People lastname", "string")),

        phoneNumber: string()
            .required(translate.__("error.middleware.validator.schema.MISSING_REQUIRED_CONTENT", "People phone number"))
            .typeError(translate.__("error.middleware.validator.schema.TYPE_ERROR", "People phone number", "string")),

        address: string()
            .required(translate.__("error.middleware.validator.schema.MISSING_REQUIRED_CONTENT", "People address"))
            .typeError(translate.__("error.middleware.validator.schema.TYPE_ERROR", "People address", "string")),

    })

};

const params = {

    params: object({

        peopleID: string()
            .required(translate.__("error.middleware.validator.schema.MISSING_REQUIRED_CONTENT", "peopleID"))
            .typeError(translate.__("error.middleware.validator.schema.TYPE_ERROR", "peopleID", "string"))
            .matches(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i, translate.__("error.middleware.validator.schema.INVALID_FORMAT", "peopleID"))

    })

};

export const addPeopleSchema = object({
    ...addPayload
});

export const getPeopleSchema = object({
    ...params
});

export const deletePeopleSchema = object({
    ...params
});

export const updatePeopleSchema = object({
    ...params,
    ...updatePayload
});