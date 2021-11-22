import { Request, Response } from 'express';
import Pet, { PetDocument } from "@models/pet.model";
import log from '@utils/logger';
import config from "config";
import translate from "@resources/translate";

/**
 * Returns all the pets that owned by this user.
 * 
 * 
 * @param req 
 * @param res 
 * @returns { PetDocument[] }
 */
export async function getPets(req: Request, res: Response) {

    const PAGE_LENGTH = config.get('pageLength') as number | 10;
    const pageLength = (isNaN(req.body.pageLength) == false) ? parseInt(req.body.pageLength) : PAGE_LENGTH;
    const pageNum = (isNaN(req.body.pageNum) == false) ? parseInt(req.body.pageNum) - 1 : 0;
    let pets: PetDocument[];

    try {

        pets = await Pet.find().skip(pageNum * pageLength).limit(pageLength);

    } catch (error: any) {

        log.error(error.message);
        return res.status(500).json({ error: error.message });

    }

    const count = await Pet.countDocuments();
    return res.status(200)
        .set({
            'total': count,
            'Access-Control-Expose-Headers': 'total'
        })
        .json({ pets: pets });

}

/**
 * Returns given petID details.
 * 
 * @returns { Pet | null }
 */
export async function getPet(req: Request, res: Response) {

    let pet: null | PetDocument;

    try {

        pet = await Pet.findOne({ _id: req.params.petID });

    } catch (error: any) {

        log.error(error.message);
        return res.status(500).json({ error: translate.__(error.message) });

    }

    return res.status(200).json({ pet: pet });
}

/**
 * Adds a single pet to the list of user pets and tries to install the selected services on this pet.
 * 
 * 
 * 
 * @param req 
 * @param res 
 * @returns { PetDocument }
 */
export async function addPet(req: Request, res: Response) {

    let pet: null | PetDocument = null;
    try {

        pet = await Pet.create({
            ...req.body
        });
        
    } catch (error: any) {
        log.error(error.message);
        return res.status(500).json({ error: translate.__(error.message) });
    }

    return res.status(201).json({ pet: pet });
};

/**
 * 
 * 
 * 
 * 
 * @param req 
 * @param res 
 */
export async function removePet(req: Request, res: Response) {
    
    const petID = req.params.petID;

    try {

        const pet = await Pet.findById(petID) as PetDocument;

        if (pet.isOwner) {

            throw new Error(translate.__("info.controller.pet.PET_HAS_OWNER"));
            
        }

        pet.delete();

    } catch (error: any) {
        log.error(error.message);
        return res.status(400).json({ error: translate.__(error.message) });
    }

    return res.sendStatus(202);
}


/**
 * 
 * 
 * 
 * 
 * @param req 
 * @param res 
 */
 export async function updatePet(req: Request, res: Response) {

    const pet = req.body as PetDocument;
    const petID = req.params.petID;
    let petUpdate: null | PetDocument;
    
    try {

        petUpdate = await Pet.findOne({ _id: petID }) as PetDocument;
        petUpdate.name = pet.name;
        petUpdate.type = pet.type;
        petUpdate.color = pet.color;
        await petUpdate.save();

    } catch (error: any) {

        log.error(error.message);
        return res.status(500).json({ error: translate.__(error.message) });

    }

    return res.status(200).json({ pet: petUpdate });

}