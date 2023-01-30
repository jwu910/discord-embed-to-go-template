import { IField } from "../App";

// Function for wrapping the entire embed after parsing
export const addCommandWrapper = (
    key: string,
    argStrings: string | string[]
  ): string => {
    return `{{ ${key} ${argStrings}\n}}`;
  };

// Function for handling single string fields
export const handleStringEmbed = (
    field: string,
    fieldValue: string
): string => { 
    return `"${field}" "${fieldValue}"\n`
};

// Function for handling color string field
export const handleColorEmbed = (
    field: string,
    fieldValue: number | null
): string => {
    if (fieldValue === null) {
        return `"${field}" nil\n`;
    } else {
        return `"${field}" ${fieldValue}\n`;
    }
};

// Function for handling fields with object values
export const handleObjectEmbed = (
    field: string,
    fieldValue: object,
): string => {
    if (field === "fields") {
        let obj = '( sdict\n'
        Object.entries(fieldValue).map(([key, value]) => {
            obj = obj + `"${key}" "${value}"\n`
        });
        obj = obj + ' )\n'
        return `${obj}`
    } else {
        let obj = '( sdict\n';
        let dictString = '';
        Object.entries(fieldValue).map(([key, value]) => { 
            dictString = dictString + `"${key}" "${value}"\n`
        });
        obj = obj + dictString + ")\n";
        return `"${field}" ${obj}`
    }
}

// Function for handling the 'fields' field 
export const handleArrayEmbed = (
    field: string,
    fieldValue: IField[]
): string => {
    let slice = '( cslice\n'
    fieldValue.forEach(i => {
        let objectEmbed = handleObjectEmbed(field, i)
        slice = slice + objectEmbed;
    });
    return `"${field}" ${slice}`;
};

export const parseKeys = (embed: Record<string, any>): string => {
    const embedCommandArray = Object.keys(embed)
        .map((key: string) => {
            switch (key) {
                case "color":
                    return handleColorEmbed(key, embed[key]);
                case "fields":
                    return handleArrayEmbed(key, embed[key]);
                case "author":
                case "image":
                case "footer":
                case "thumbnail":
                case "video":
                case "provider":
                    return handleObjectEmbed(key, embed[key]);
                case "title":
                case "type":
                case "description":
                case "url":
                    return handleStringEmbed(key, embed[key]);
            }
        }).join("")

    return addCommandWrapper(
        "$embed := cembed",
        `( sdict\n${embedCommandArray})`
    );
};