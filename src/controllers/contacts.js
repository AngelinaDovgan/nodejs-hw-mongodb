import { getContacts, getContactsById } from "../services/contacts.js";
import createHttpError from 'http-errors';

export const getContactsController = async (req, res) => {
    const contacts = await getContacts();
    res.json({
        status: 200,
        message: "Successfully found contacts!",
        data: contacts,
    });
};

export const getContactsByIdController = async (req, res, next) => {
        const { contactId } = req.params;
        try {
            const contact = await getContactsById(contactId);
            if (!contact) {
                next(createHttpError(404, "Contact not found..."));
                return;
            }
            res.json({
                status: 200,
                data: contact,
                message: `Successfully found contact with id ${contactId}!`,
            });
        } catch (error) {
                next(error);
            }
    };