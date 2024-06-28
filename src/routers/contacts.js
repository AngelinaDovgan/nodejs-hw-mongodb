import { Router } from "express";
import { getContactsByIdController, getContactsController, createContactController, patchContactController, deleteContactController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema, updateContactSchema } from "../validation/contacts.js";

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', ctrlWrapper(getContactsByIdController));

router.post('/contacts', ctrlWrapper(createContactController), validateBody(createContactSchema));
router.patch('/contacts/:contactId', ctrlWrapper(patchContactController), validateBody(updateContactSchema));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

export default router;