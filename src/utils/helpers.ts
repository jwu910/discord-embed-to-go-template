import { ICommand } from "../App";

export const addCommandWrapper = (
  key: string,
  argStrings: string | string[]
): string => {
  return `{{ ${key} ${argStrings}\n}}`;
};

export const addFunctionWrapper = (
  functionName: string,
  args: string[]
): string => {
  return `( ${functionName} ${args.join(" ")}\n\t)`;
};

export const makeCommandFromArgs = (
  key: string,
  args: string[] | { [key: string]: string },
  type?: ICommand
): string => {
  let returnArg = "";
  if (Array.isArray(args)) {
    returnArg = `"${key}" ${addFunctionWrapper(
      "cslice",
      args.map((arg) => arg)
    )}`;
  } else if (typeof args === "object") {
    returnArg = `\t"${key}" ${addFunctionWrapper(
      "sdict",
      Object.entries(args).map(
        ([key, value]) => `\n\t\t"${key}" ${JSON.stringify(value)}`
      )
    )}`;
  } else if (typeof args === "string" || typeof args === "number") {
    returnArg = `"${key}" ${JSON.stringify(args)}`;
  } else {
  }
  return `\n${returnArg}`;
};

export const parseKeys = (embed: Record<string, any>): string => {
  const embedCommandArray = Object.keys(embed)
    .map((key: string) => {
      switch (key) {
        case "author":
        case "footer":
        case "image":
        case "thumbnail":
          return makeCommandFromArgs(key, embed[key], ICommand.Object);
        case "fields":
          const fields = embed.fields.map((field: Record<string, string>) => {
            return makeCommandFromArgs(key, field, ICommand.Object);
          });

          return makeCommandFromArgs(key, fields, ICommand.Array);
        default:
          return makeCommandFromArgs(key, embed[key]);
      }
    })
    .join("");

  return addCommandWrapper(
    "$embed := cembed",
    `( sdict\n${embedCommandArray} )`
  );
};
