import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";
import log from "@utils/logger";
import translate from '@resources/translate';

/**
 * 
 * 
 * 
 * 
 * @param schema 
 * @returns 
 */
const requestValidator = (schema: AnySchema) => async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
        });

        return next();

    } catch (error: any) {

        log.error(error.errors[0]);
        return res.status(400).send({ error: translate.__(error.errors[0]) });

    }
};

export default requestValidator;
