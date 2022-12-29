
import { ICommand, IEmbed } from "../App";

export const addCommandWrapper = (argStrings: string): string => {
  return `{{ ${argStrings} }}`;
};

export const makeCommandFromArgs = (type: ICommand, args: string[]): string => {
  return ``;
}

export const parseKeys = (embed: IEmbed): string[] => {
  return [];
}