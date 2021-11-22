import { Request, Response } from "express";
import People, { PeopleDocument } from "@models/people.model";
import Pet, { PetDocument } from "@models/pet.model";
import log from "@utils/logger";
import config from "config";
import translate from "@resources/translate";

/**
 * Returns all Peoples.
 * 
 * 
 * 
 * @param req 
 * @param res 
 * @returns { PeopleDocument[] } 
 */
export async function getPeoples(req: Request, res: Response) {

    const PAGE_LENGTH = config.get('pageLength') as number | 10;
    const pageLength = (isNaN(req.body.pageLength) == false) ? parseInt(req.body.pageLength) : PAGE_LENGTH;
    const pageNum = (isNaN(req.body.pageNum) == false) ? parseInt(req.body.pageNum) - 1 : 0;
    let Peoples: PeopleDocument[] = [];

    try {

        Peoples = await People.find().skip(pageNum * pageLength).limit(pageLength);

    } catch (error: any) {

        log.error(error.message);
        return res.status(500).json({ error: translate.__(error.message) });

    }

    const count = await People.countDocuments();
    return res.status(200)
        .set({
            'total': count,
            'Access-Control-Expose-Headers': 'total'
        })
        .json({ Peoples: Peoples });

}

/**
 * Returns given People by peopleIDs.
 * 
 * 
 * 
 * @param req 
 * @param res 
 * @returns { PeopleDocument }
 */
export async function getPeople(req: Request, res: Response) {

    const peopleID = req.params.peopleID;

    try {
        const people = await People.findById(peopleID);
        return res.status(200).json({ people: people });

    } catch (error: any) {

        log.error(error.message);
        return res.status(500).json({ error: translate.__(error.message) });

    }

}


/**
 * Stores given People inside database.
 * 
 * 
 * 
 * @param req 
 * @param res 
 * @returns { PeopleDocument }
 */
export async function addPeople(req: Request, res: Response) {
    
    const peopleData = req.body as PeopleDocument;
    let people;

    try {

        people = await People.create(peopleData);

    } catch (error: any) {

        log.error(error.message);
        return res.status(500).json({ error: translate.__(error.message) });

    }

    return res.status(201).json({ people: people });

}

/**
 *  Stores given and update People inside database.
 * 
 * 
 * 
 * @param req 
 * @param res 
 * @returns { PeopleDocument }
 * 
 */
export async function updatePeople(req: Request, res: Response) {

    const people = req.body as PeopleDocument;
    const peopleID = req.params.peopleID;
    let peopleUpdate;

    try {

        peopleUpdate = await People.findById(peopleID) as PeopleDocument;
        peopleUpdate.firstname = people.firstname;
        peopleUpdate.lastname = people.lastname;
        peopleUpdate.phoneNumber = people.phoneNumber;
        peopleUpdate.address = people.address;
        peopleUpdate.frinds = people.frinds;
        peopleUpdate.pets = people.pets;
        await peopleUpdate.save();

    } catch (error: any) {
        log.error(error.message);
    }

    return res.status(200).json({ people: peopleUpdate });
    
}

/**
 * Deletes given People from database bt peopleID.
 * 
 * 
 * 
 * @param req 
 * @param res 
 */
export async function deletePeople(req: Request, res: Response) {

    const peopleID = req.params.peopleID;

    try {

        const people = await People.findById(peopleID);
        if (people) {
            await people.delete();
        }

    } catch (error: any) {

        log.error(error.message);

    }

    return res.sendStatus(200);
    
}

/**
 * Add friend to people By ID.
 * 
 * 
 * 
 * @param req 
 * @param res 
 */
export async function assignedFrind(req: Request, res: Response) {

    const peopleID = req.params.peopleID;
    const friendID = req.params.friendID;

    try {

        const people = await People.findById(peopleID) as PeopleDocument;

        if (people) {
            people.frinds = people.frinds.filter(function(item) {
                return item != friendID;
            });
            people.frinds.push(friendID)
            await people.save();
        }

        return res.status(200).json({ people: people });

    } catch (error: any) {

        log.error(error.message);

    }
    
}

/**
 * Delete friend to people By ID.
 * 
 * 
 * 
 * @param req 
 * @param res 
 */
export async function unassignedFrind(req: Request, res: Response) {

    const peopleID = req.params.peopleID;
    const friendID = req.params.friendID;

    try {

        const people = await People.findById(peopleID) as PeopleDocument;
        if (people) {
            people.frinds = people.frinds.filter(function(item) {
                return item != friendID;
            });
            await people.save();
        }

        return res.status(200).json({ people: people });

    } catch (error: any) {

        log.error(error.message);

    }
    
}

/**
 * Add pet to people By ID.
 * 
 * 
 * 
 * @param req 
 * @param res 
 */
 export async function assignedPet(req: Request, res: Response) {

    const peopleID = req.params.peopleID;
    const petID = req.params.petID;

    try {

        const people = await People.findById(peopleID) as PeopleDocument;

        if (people) {
            people.pets = people.pets.filter(function(item) {
                return item != petID;
            });
            people.pets.push(petID)
            await people.save();
        }

        const pet = await Pet.findById(petID) as PetDocument;
        pet.isOwner = true;
        pet.ownerID = peopleID;
        await pet.save();

        return res.status(200).json({ people: people, pet: pet });

    } catch (error: any) {

        log.error(error.message);

    }
    
}

/**
 * Delete pet to people By ID.
 * 
 * 
 * 
 * @param req 
 * @param res 
 */
export async function unassignedPet(req: Request, res: Response) {

    const peopleID = req.params.peopleID;
    const petID = req.params.petID;

    try {

        const people = await People.findById(peopleID) as PeopleDocument;
        if (people) {
            people.pets = people.pets.filter(function(item) {
                return item != petID;
            });
            await people.save();
        }

        const pet = await Pet.findById(petID) as PetDocument;
        pet.isOwner = false;
        pet.ownerID = '';
        await pet.save();

        return res.status(200).json({ people: people, pet: pet });

    } catch (error: any) {

        log.error(error.message);

    }
    
}