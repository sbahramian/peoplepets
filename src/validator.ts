import express from 'express';
import authenticate from '@middlewares/auth';
import i18n from '@resources/translate';
import cors from "cors";

const validator = (app: express.Express) => {

    // cors middleware
    app.use(cors());

    // set i18n
    app.use(i18n.init);
    app.use(function (req, res, next) {
        i18n.init(req, res);      
        if (typeof req.locale !== 'undefined') {
          i18n.setLocale(req.locale);
        } else {
          const locale = i18n.getLocale();
          res.set('Content-Language', locale);
        }
        next();
    });

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(authenticate);
};

export default validator;