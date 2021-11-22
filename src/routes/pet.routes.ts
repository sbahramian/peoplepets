import Router from 'express';
import requestValidator from '@middlewares/validator/request.validator';
import { petDataValidator, petUpdateDataValidator, petDeleteDataValidator } from "@middlewares/validator/pet.validator";
import { createPetSchema, getPetSchema, deletePetSchema, updatePetSchema } from '@middlewares/validator/schema/pet.schema';
import { addPet, getPet, getPets, updatePet, removePet } from '@controllers/pet.controller';

const petRouter = Router();

petRouter.get('/', getPets);
petRouter.get('/:petID', requestValidator(getPetSchema), getPet);
petRouter.post('/', [requestValidator(createPetSchema), petDataValidator], addPet);
petRouter.delete('/:petID', [requestValidator(deletePetSchema), petDeleteDataValidator], removePet);
petRouter.put('/:petID', [requestValidator(updatePetSchema), petUpdateDataValidator], updatePet);

export default petRouter;