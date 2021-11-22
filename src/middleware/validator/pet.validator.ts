import { Request, Response, NextFunction } from "express";
import Pet, { PetDocument } from "@models/pet.model";
import translate from '@resources/translate';

/**
 *  
 * 
 * 
 * 
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
const petDataValidator = async (req: Request, res: Response, next: NextFunction) => {
    
    const pet = req.body as PetDocument;

    try {

        const instance = await Pet.findOne({ 
            name: pet.name,
            type: pet.type,
            color: pet.color
        });

        if(instance) {
            throw new Error(translate.__("info.middleware.validator.pet.PET_NAME_ALREADY_EXISTS"));
        }
        
        return next();

    } catch (error: any) {
        return res.status(400).json({error: translate.__(error.message)});
    }
};

/**
 * 
 * 
 * 
 * 
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
 const petUpdateDataValidator = async (req: Request, res: Response, next: NextFunction) => {
    
    const pet = req.body as PetDocument;
    const petID = req.params.petID;

    try {

        let instance = await Pet.findOne({ _id: petID });
        
        if (!instance) {
            throw new Error(translate.__("info.middleware.validator.pet.PET_NOT_EXISTS"));
        }

        instance = await Pet.findOne({ 
            name: pet.name,
            type: pet.type,
            color: pet.color
        });

        if (instance) {
            throw new Error(translate.__("info.middleware.validator.pet.PET_NAME_ALREADY_EXISTS"));
        }

        return next();

    } catch (error: any) {
        return res.status(400).json({error: translate.__(error.message)});
    }
};


/**
 *  
 * 
 * 
 * 
 * @param req
 * @param res
 * @param next
 * @returns { NextFucntion | json }
 */
const petDeleteDataValidator = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const pet = await Pet.findOne({ _id: req.params.petID }) as PetDocument;

        if (pet.isOwner) {
            throw new Error(translate.__("info.middleware.validator.pet.PET_HAS_OWNER_NOT_DELETED"));
        }
    
    } catch (error: any) {
        return res.status(400).json({error: translate.__(error.message)});
    }

    return next();
}

export { petDataValidator, petUpdateDataValidator, petDeleteDataValidator };
