import { ContactsCollection } from "../db/models/contactModel.js";

export const getContacts = async () => {
    const contacts = await ContactsCollection.find();
    return contacts;
};

export const getContactsById = async (contactId) => {
    const contact = await ContactsCollection.findById(contactId);
    return contact;
};

export const createContact = async (payload) => {
    const contact = await ContactsCollection.create(payload);
    return contact;
};