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

function App() {
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");

  useEffect(() => {
    try {
      const output = parseKeys(JSON.parse(inputValue));
      setOutputValue(output);
    } catch (error) {
      console.log("inputValue", JSON.stringify(inputValue, null, 2));
      console.error(error);
    }
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
