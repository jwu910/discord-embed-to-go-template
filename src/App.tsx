import './App.scss';

import { Box, Stack } from '@mui/material';
import { useEffect, useState } from 'react';

export interface ICommand {
  Array: "cslice";
  Object: "sdict";
}

export interface IEmbed {
  author?: {
    name: string;
    url: string;
    icon_url: string;
  };
  channel?: string;
  color?: number;
  content?: string;
  description?: string;
  fields: {
    name: string;
    value: string;
    inline?: boolean;
  }[];
  footer?: { text: string; icon_url: string };
  image?: { url: string };
  message?: string;
  thumbnail?: { url: string };
  timestamp?: string;
  title?: string;
  url?: string;
}

function App() {
  const [inputValue, setInputValue] = useState("");

  const handleJSONInput = (json: string): string => {
    return "";
  };

  useEffect(() => {
    console.log("inputValue :>> ", inputValue);

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
        ></textarea>
      </Stack>
    </Box>
  );
}

export default App;
