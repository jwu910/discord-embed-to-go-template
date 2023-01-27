import { ICommand, IAuthor, IFooter, IField } from "../App";

// ICommand is an enumerator which represents 
// the different data types that can be used in an embed
// enum ICommand {
//  Array = "cslice",
//  Object = "sdict",    
//}
//

// Interface to encompass images, thumbnails, and videos
interface IMedia {
    url?: string;
    proxy_url?: string;
    height?: number;
    width?: number;
}

interface IProvider {
    name?: string;
    url?: string;
}

// interface for all fields which have an object type value
interface IEmbedObject {
    author?: IAuthor;
    footer?: IFooter;
    thumbnail?: IMedia;
    image?: IMedia;
    video?: IMedia;
    provider?: IProvider;
}
enum EmbedObjects {
    Author = "author",
    Footer = "footer",
    Thumbnail = "thumbnail",
    Image = "image",
    Video = "video",
    Provider = "provider",
}
// TODO: Figure out what to do with each object field.
// Might be useful to use an enum for the options

// This function is for wrapping the entire embed after parsing?
// export const addCommandWrapper = (
//     key: string, //
//     )


// Function for handling single string fields
export const handleStringEmbed = (
    field: string,
    fieldValue: string
): string => { 
    return `${field}" "${fieldValue}`
};

// Function for handling color string field
export const handleColorEmbed = (
    field: string,
    fieldValue: number | null
): string => {
    if (fieldValue === null) {
        return `"${field}" nil`;
    } else {
        return `"${field}" ${fieldValue}`;
    }
};

// Function for handling field with array value
export const handleArrayEmbed = (
    field: string,
    fieldValue: IField[]
): string => {
    let slice = "( cslice\n"
    fieldValue.forEach(i => {
        let obj = "( sdict\n"
        Object.entries(i).map(
            ([key, value]) => obj = obj + `"${key}" ${JSON.stringify(value)}\n` 
        );
        obj = obj + " )\n"
        slice = slice + obj;
    });
    return `${field} ${slice}`;
};

// Function for handling fields with object values
// export const handleObjectEmbed = (
//     field: EmbedObjects,
//     fieldValue: IEmbedObject
// ): string => {
//     switch (field) {
//         case EmbedObjects.Author:
//             return `${EmbedObjects.Author}\n (sdict ${JSON.stringify(fieldValue)})`
//     }
// }