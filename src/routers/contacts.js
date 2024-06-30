import { Router } from "express";
import { getContactsByIdController, getContactsController, createContactController, patchContactController, deleteContactController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema, updateContactSchema } from "../validation/contacts.js";
import { isValidId } from "../middlewares/isValidId.js";

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactsByIdController));

router.post('/contacts', ctrlWrapper(createContactController), validateBody(createContactSchema));
router.patch('/contacts/:contactId', isValidId, ctrlWrapper(patchContactController), validateBody(updateContactSchema));
router.delete('/contacts/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default router;