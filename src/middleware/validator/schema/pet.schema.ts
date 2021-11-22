import { object, string, boolean } from "yup";
import translate from '@resources/translate';

const payload = {

  body: object({

    name: string()
      .required(translate.__("error.middleware.validator.schema.MISSING_REQUIRED_CONTENT", "Pet name"))
      .typeError(translate.__("error.middleware.validator.schema.TYPE_ERROR", "Pet name", "string")),

    type: string()
        .required(translate.__("error.middleware.validator.schema.MISSING_REQUIRED_CONTENT", "Pet type"))
        .typeError(translate.__("error.middleware.validator.schema.TYPE_ERROR", "Pet type", "string")),

    color: string()
        .required(translate.__("error.middleware.validator.schema.MISSING_REQUIRED_CONTENT", "Pet color"))
        .typeError(translate.__("error.middleware.validator.schema.TYPE_ERROR", "Pet color", "string")),

  }),
};

const params = {

  params: object({

    petID: string()
      .required(translate.__("error.middleware.validator.schema.MISSING_REQUIRED_CONTENT", "petID"))
      .matches(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i, translate.__("error.middleware.validator.schema.INVALID_FORMAT", "petID")),
      
  }),

};


export const getPetSchema = object({
  ...params,
});

export const createPetSchema = object({
  ...payload,
});

export const updatePetSchema = object({
  ...params,
  ...payload,
});

export const deletePetSchema = object({
  ...params,
});
