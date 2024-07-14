import { SORT_ORDER } from "../constants/index.js";
import { ContactsCollection } from "../db/models/contactModel.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getContacts = async ({
    page = 1,
    perPage = 10,
    sortOrder = SORT_ORDER.ASC,
    sortBy = 'name',
    filter
}) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = ContactsCollection.find();
    if (filter.type) {
        contactsQuery.where("contactType").equals(filter.type);
    }
    if (filter.isFavourite !== null) {
        contactsQuery.where("isFavourite").equals(filter.isFavourite);
    }
    if (filter.userId) {
        contactsQuery.where('userId').equals(filter.userId);
    }


    const contactsCount = await ContactsCollection.find()
        .merge(contactsQuery)
        .countDocuments();
    
    const contacts = await contactsQuery
        .skip(skip)
        .limit(limit)
        .sort({[sortBy]: sortOrder })
        .exec();

    const paginationData = calculatePaginationData(contactsCount, perPage, page);

    return {
        data: contacts,
        ...paginationData,
    };
};

export const getContactsById = async (contactId, userId) => {
    const contact = await ContactsCollection.findOne({ _id: contactId, userId });
    return contact;
};


export const createContact = async (payload) => {
    const contact = await ContactsCollection.create(payload);
    return contact;
};

// export const updateContact = async (contactId, payload, userId, options = {}) => {
//     const rawResult = await ContactsCollection.findOneAndUpdate(
//         { _id: contactId, userId },
//         payload,
//         {
//             new: true,
//             includeResultMetadata: true,
//             ...options,
//         },
//     );
//     if (!rawResult || !rawResult.value) return null;
//     return {
//         contact: rawResult.value,
//         isNew: Boolean(rawResult?.lastErrorObject?.upserted),
//     };
// };

export const updateContact = async (filter, payload, options = {}) => {
    const rawResult = await ContactsCollection.findOneAndUpdate(
        filter,
        payload,
        {
            new: true,
            includeResultMetadata: true,
            ...options,
        },
    );
    if (!rawResult || !rawResult.value) return null;
    return {
        contact: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
};

export const deleteContact = async (contactId, userId) => {
    const contact = await ContactsCollection.findOneAndDelete({
        _id: contactId,
        userId,
    });
    return contact;
};