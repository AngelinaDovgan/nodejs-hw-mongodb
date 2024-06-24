import { getContacts, getContactsById, createContact, updateContact, deleteContact } from "../services/contacts.js";
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
    
export const createContactController = async (req, res) => {
    const contact = await createContact(req.body);
    console.log(req.body);

    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data: contact,
    });
};

export const patchContactController = async (req, res) => {
    const { contactId } = req.params;

    try {
        const result = await updateContact(contactId, req.body);
        
    if (!result) {
        return next(createHttpError(404, {
        status: 404,
        message: 'Contact not found',
        data: {message: 'Contact not found'}
        }));
    }
    res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.contact,
    });  
    } catch (error) {
        next(error);
    }  
};

export const deleteContactController = async (req, res) => {
    const { contactId } = req.params;

    try {
        const contact = await deleteContact(contactId);

        if (!contact) {
            return next(createHttpError(404, 'Contact not found',
                {
                    status: 404,
                    message: 'Contact not found',
                }
            ));

        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};