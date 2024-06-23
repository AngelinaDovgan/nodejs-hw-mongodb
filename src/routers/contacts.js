import { Router } from "express";
import { getContactsByIdController, getContactsController, createContactController, patchContactController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactsId', ctrlWrapper(getContactsByIdController));

router.post('/contacts', ctrlWrapper(createContactController));
router.patch('/contacts/:contactsId', ctrlWrapper(patchContactController));

export default router;