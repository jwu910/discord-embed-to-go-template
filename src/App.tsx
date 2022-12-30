import "./App.scss";

import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { parseKeys } from "./utils/helpers";

export enum ICommand {
  Array = "cslice",
  Object = "sdict",
}

export interface IAuthor {
  name: string;
  url: string;
  icon_url: string;
}
export interface IField {
  name: string;
  value: string;
  inline?: boolean;
}

export interface IFooter {
  text: string;
  icon_url: string;
}

export interface IEmbed {
  author?: IAuthor;
  channel?: string;
  color?: number;
  content?: string;
  description?: string;
  fields: IField[];
  footer?: IFooter;
  image?: { url: string };
  message?: string;
  thumbnail?: { url: string };
  timestamp?: string;
  title?: string;
  url?: string;
}

const sampleJSON = JSON.stringify({
  title: "Discord bot",
  description:
    "Discohook has a bot as well, it's not strictly required to send messages it may be helpful to have it ready.\n\nBelow is a small but incomplete overview of what the bot can do for you.",
  color: 5814783,
  fields: [
    {
      name: "Getting special formatting for mentions, channels, and emoji",
      value:
        "The **/format** command of the bot can give you special formatting for use in Discord messages that lets you create mentions, tag channels, or use emoji ready to paste into the editor!\n\nThere are [manual ways](https://discord.dev/reference#message-formatting) of doing this, but it's very error prone. The bot will make sure you'll always get the right formatting for your needs.",
    },
    {
      name: "Creating reaction roles",
      value:
        "You can manage reaction roles with the bot using the **/reaction-role** command.\n\nThe set-up process is very intuitive: type out **/reaction-role create**, paste a message link, select an emoji, and pick a role. Hit enter and you're done, your members can now react to any of your messages to pick their roles.",
    },
    {
      name: "Recover Discohook messages from your server",
      value:
        "It can also restore any message sent in your Discord server for you via the apps menu.\n\nTo get started, right-click or long-press on any message in your server, press on apps, and then press **Restore to Discohook**. It'll send you a link that leads to the editor page containing the message you selected!",
    },
    {
      name: "Other features",
      value:
        "Discohook can also grab images from profile pictures or emoji, manage your webhooks, and more. Invite the bot and use **/help** to learn about all the bot offers!",
    },
  ],
});

function App() {
  const [inputValue, setInputValue] = useState(sampleJSON);
  const [outputValue, setOutputValue] = useState("");

  useEffect(() => {
    console.log("inputValue :>> ", inputValue);
    try {
      const output = parseKeys(JSON.parse(inputValue));
      setOutputValue(output);
    } catch (error) {
      console.log("inputValue", JSON.stringify(inputValue, null, 2));
    }
    /*
      Send current string into json validator?
      Use json validation lib?
      validate JSON schema (for above?) https://www.npmjs.com/package/jsonschema
      key should match up with discord embed schema https://discord.com/developers/docs/resources/channel#embed-object
      if valid json, send string into parser
      parser will check every key
      With valid JSON AND embed structure, pass each key into parser

      parser function will need to check for value type, if its Array, object, string, or number, and return the appropriate value.
      string and number can probably return as is
      array should return as constructed cslice
      object should return as constructed sdict [key value] key value]
      each key/value pair should be pushed to an array of arrays Command[Command[]]?

      
      return value can pass to output textarea with respected white space
    */
  }, [inputValue]);

  return (
    <Box sx={{ padding: 2, margin: "auto", width: "70%" }}>
      <h2>Embed to Go Templates</h2>
      <p>Convert JSON to go template structs for Yagpdb</p>
      <Stack sx={{ margin: "auto" }} direction="row" spacing={3}>
        <textarea
          style={{ flexGrow: 1 }}
          cols={50}
          rows={30}
          id="input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        ></textarea>

        <textarea
          style={{ flexGrow: 1 }}
          cols={50}
          rows={30}
          id="output"
          value={outputValue}
        ></textarea>
      </Stack>
    </Box>
  );
}

export default App;
