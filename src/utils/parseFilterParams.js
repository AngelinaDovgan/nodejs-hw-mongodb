import { typeList } from "../constants/contacts-constants.js";

// const parseBoolean = value => {
//     if (typeof value !== "string") return;
//     if (!['true', 'false'].includes(value)) return;

//     const parsedValue = Boolean(value);
//     return parsedValue;
// };

const parseBoolean = (value) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return null;
}

// export const parseFilterParams = (query) => {
//     const { type, isFavourite } = query;

//     const parsedType = typeList.includes(type) ? type : null;
//     const parsedFavourite = parseBoolean(isFavourite);

//     return {
//         type: parsedType,
//         isFavourite: parsedFavourite,
//     };
// };

export const parseFilterParams = (query) => {
    const { type, isFavourite } = query;
    const parsedType = typeList.includes(type) ? type : null;
    const parsedFavourite = parseBoolean(isFavourite);

    return {
        type: parsedType,
        isFavourite: parsedFavourite
    };
};
