import { getContacts, getContactsById, createContact, updateContact, deleteContact } from "../services/contacts.js";
import createHttpError from 'http-errors';
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";

export const getContactsController = async (req, res) => {
    const { page, perPage } = parsePaginationParams(req.query);

    const { sortBy, sortOrder } = parseSortParams(req.query);

    const { type, isFavourite } = parseFilterParams(req.query);

        const contacts = await getContacts({
            page,
            perPage,
            sortBy,
            sortOrder,
            type,
            isFavourite,
        });
    
    if (contacts.length === 0) {
        return res.status(404).json({
            status: 404,
            message: "No contacts found!"
        });
    }
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

export const patchContactController = async (req, res, next) => {
    const { contactId } = req.params;

    try {
        const result = await updateContact(contactId, req.body);
        
    if (!result) {
        const error = createHttpError(404, 'Contact not found',
        {
        status: 404,
        message: 'Contact not found',
        // data: {message: 'Contact not found'},
        });
        
    return next(error);
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


export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;

    try {
        const contact = await deleteContact(contactId);

        if (!contact) {
            const error = createHttpError(404, 'Contact not found',
                {
                    status: 404,
                    message: 'Contact not found',
                    // data: { message: "Contact not found" },
                });
            return next(error);
        }

    res.status(204).send();
    } catch (error) {
        next(error);
    }
};