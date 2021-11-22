import { Request, Response, NextFunction } from "express";
import People, { PeopleDocument } from "@models/people.model";
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
const peopleDataValidator = async (req: Request, res: Response, next: NextFunction) => {
    
    const people = req.body as PeopleDocument;

    try {

        const instance = await People.findOne({ 
            firstname: people.firstname,
            lastname: people.lastname
        });

        if(instance) {
            throw new Error(translate.__("info.middleware.validator.people.PEOPLE_NAME_ALREADY_EXISTS"));
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
 const peopleUpdateDataValidator = async (req: Request, res: Response, next: NextFunction) => {
    
    const people = req.body as PeopleDocument;
    const peopleID = req.params.peopleID;

    try {

        let instance = await People.findById(req.params.peopleID);
        
        if (!instance) {
            throw new Error(translate.__("error.NOT_FOUND", "people"));
        }

        instance = await People.findOne({ 
            firstname: people.firstname,
            lastname: people.lastname,
            phoneNumber: people.phoneNumber,
            address: people.address
        });

        if (instance) {
            throw new Error(translate.__("info.middleware.validator.domain.PEOPLE_ALREADY_ADDED"));
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
 const peopleDeleteDataValidator = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const instance = await People.findById(req.params.peopleID) as PeopleDocument;

        if (!instance) {
            throw new Error(translate.__("error.NOT_FOUND", "people"));
        }

        if ( instance.pets.length > 0 ) {
            throw new Error(translate.__("info.middleware.validator.people.PEOPLE_HAS_PETS"));
        }

        if ( instance.frinds.length > 0 ) {
            throw new Error(translate.__("info.middleware.validator.people.PEOPLE_HAS_FRINDS"));
        }
    
    } catch (error: any) {
        return res.status(400).json({error: translate.__(error.message)});
    }

    return next();
}

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
const peopleFirendDataValidator = async (req: Request, res: Response, next: NextFunction) => {

    try {

        if (req.params.peopleID == req.params.friendID) {
            throw new Error(translate.__("error.EQUAL_ID", "peopleID", "friendID"));
        }

        let instance = await People.findById(req.params.peopleID) as PeopleDocument;

        if (!instance) {
            throw new Error(translate.__("error.NOT_FOUND", "people"));
        }

        instance = await People.findById(req.params.friendID) as PeopleDocument;

        if (!instance) {
            throw new Error(translate.__("error.NOT_FOUND", "friend"));
        }
    
    } catch (error: any) {
        return res.status(400).json({error: translate.__(error.message)});
    }

    return next();
}

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
 const peoplePetDataValidator = async (req: Request, res: Response, next: NextFunction) => {

    try {

        let people = await People.findById(req.params.peopleID) as PeopleDocument;

        if (!people) {
            throw new Error(translate.__("error.NOT_FOUND", "people"));
        }

        let pet = await Pet.findById(req.params.petID) as PetDocument;

        if (!pet) {
            throw new Error(translate.__("error.NOT_FOUND", "pet"));
        }

        if (pet.isOwner) {
            throw new Error(translate.__("error.PET_HAS_OWNER", "pet"));
        }
    
    } catch (error: any) {
        return res.status(400).json({error: translate.__(error.message)});
    }

    return next();
}

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
const peoplePetDeleteDataValidator = async (req: Request, res: Response, next: NextFunction) => {

    try {

        let people = await People.findById(req.params.peopleID) as PeopleDocument;

        if (!people) {
            throw new Error(translate.__("error.NOT_FOUND", "people"));
        }

        let pet = await Pet.findById(req.params.petID) as PetDocument;

        if (!pet) {
            throw new Error(translate.__("error.NOT_FOUND", "pet"));
        }
        
    } catch (error: any) {
        return res.status(400).json({error: translate.__(error.message)});
    }

    return next();
}

export { peopleDataValidator, peopleUpdateDataValidator, peopleDeleteDataValidator, peopleFirendDataValidator, peoplePetDataValidator, peoplePetDeleteDataValidator };
