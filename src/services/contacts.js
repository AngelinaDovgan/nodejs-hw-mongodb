import { ContactsCollection } from "../db/models/contactModel";

export const getContacts = async () => {
    const contacts = await ContactsCollection.find();
    return contacts;
};

export const 