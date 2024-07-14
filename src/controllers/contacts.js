import { getContacts, getContactsById, createContact, updateContact, deleteContact } from "../services/contacts.js";
import createHttpError from 'http-errors';
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";
import { saveFileToUploadDir } from "../utils/saveFileToUploadDir.js";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";
import { env } from '../utils/env.js';

export const getContactsController = async (req, res) => {
const { _id: userId } = req.user;
const { page, perPage } = parsePaginationParams(req.query);
const { sortBy, sortOrder } = parseSortParams(req.query);
// const { type, isFavourite } = parseFilterParams(req.query);
const filter = { ...parseFilterParams(req.query), userId };

        const contacts = await getContacts({
            page,
            perPage,
            sortBy,
            sortOrder,
            filter,
        });
        res.json({
            status: 200,
            message: "Successfully found contacts!",
            data: contacts,
        });
   
};

export const getContactsByIdController = async (req, res, next) => {
    try {
    const { _id: userId } = req.user;
    const { contactId } = req.params;
        
            const contact = await getContactsById(contactId, userId);
            if (!contact) {
            return next(createHttpError(404, "Contact not found..."));   
            }
            res.status(200).json({
                status: 200,
                data: contact,
                message: `Successfully found contact with id ${contactId}!`,
            });
        } catch (error) {
                next(error);
            }
};
    
export const createContactController = async (req, res, next) => {
    try {
        const { _id: userId } = req.user;
    let photo = ''

    if (req.file) {
        {
        if (env('ENABLE_CLOUDINARY') === 'true') {
            photo = await saveFileToCloudinary(req.file, 'photo');
        } else {
            photo = saveFileToUploadDir(req.file, 'photo');
        }
    }
    }
    const contactData = { ...req.body, userId };
        const contact = await createContact(contactData);
      res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data: contact,
    });    
    } catch (error) {
        next(error);
}
};

export const patchContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const { _id: userId } = req.user;
    const photo = req.file;

    let photoUrl;
    
    if (photo) {
        if (env('ENABLE_CLOUDINARY') === 'true') {
            photoUrl = await saveFileToCloudinary(photo);
        } else {
            photoUrl = saveFileToUploadDir(photo);
        }
    }

    const result = await updateContact(
        { _id: contactId, userId },
        {
            ...req.body,
            photo: photoUrl,
        });
        
    if (!result) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }
    
    res.json({
        status: 200,
        message: 'Successfully patched a contact!',
        data: result.contact,
    });
};

export const deleteContactController = async (req, res, next) => {
    const { _id: userId } = req.user;
    const { contactId } = req.params;
   

    try {
        const contact = await deleteContact({ _id: contactId, userId });

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