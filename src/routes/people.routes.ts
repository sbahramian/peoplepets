import Router from "express";
import requestValidator from "@middlewares/validator/request.validator";
import { getPeoples, getPeople, addPeople, deletePeople, updatePeople, assignedFrind, unassignedFrind, assignedPet, unassignedPet } from "@controllers/people.controller";
import { getPeopleSchema, addPeopleSchema, deletePeopleSchema, updatePeopleSchema } from "@middlewares/validator/schema/people.schema";
import { peopleDataValidator, peopleUpdateDataValidator, peopleDeleteDataValidator, peopleFirendDataValidator, peoplePetDataValidator, peoplePetDeleteDataValidator } from "@middlewares/validator/people.validator";

const peopleRouter = Router();

peopleRouter.get('/', getPeoples);
peopleRouter.get('/:peopleID', requestValidator(getPeopleSchema) ,getPeople);
peopleRouter.post('/', [requestValidator(addPeopleSchema), peopleDataValidator], addPeople);
peopleRouter.delete('/:peopleID', [requestValidator(deletePeopleSchema), peopleDeleteDataValidator], deletePeople);
peopleRouter.put('/:peopleID', [requestValidator(updatePeopleSchema), peopleUpdateDataValidator], updatePeople);

peopleRouter.post('/:peopleID/friend/:friendID', [requestValidator(getPeopleSchema), peopleFirendDataValidator], assignedFrind);
peopleRouter.delete('/:peopleID/friend/:friendID', [requestValidator(getPeopleSchema), peopleFirendDataValidator], unassignedFrind);

peopleRouter.post('/:peopleID/pet/:petID', [requestValidator(getPeopleSchema), peoplePetDataValidator], assignedPet);
peopleRouter.delete('/:peopleID/pet/:petID', [requestValidator(getPeopleSchema), peoplePetDeleteDataValidator], unassignedPet);

export default peopleRouter;