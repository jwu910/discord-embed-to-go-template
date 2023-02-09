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
    <Box sx={{ padding: 2, margin: "auto", width: "70%", height: "100vh" }}>
      <div className="header-details">
        <h2>Embed to Go Templates</h2>
        <p>Convert JSON to Go template structs for Yagpdb</p>
        <p>
          Visit one of the embed builder sites and paste the{" "}
          <strong>JSON</strong> for a <strong>single</strong> Embed in the first box.
        </p>
        <ol>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://discohook.org/"
            >
              Discohook
            </a>
          </li>

          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://embed.dan.onl/"
            >
              Embed.dan.onl
            </a>
          </li>
        </ol>
      </div>

      <Stack sx={{ margin: "auto" }} className="text-areas" spacing={3}>
        <textarea
          cols={50}
          rows={20}
          id="input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        ></textarea>

        <textarea
          cols={50}
          rows={20}
          id="output"
          value={outputValue}
        ></textarea>
      </Stack>
      <footer>
        <p>
          © {new Date().getFullYear()} The EmbedToGo Author. EmbedToGo is not
          affiliated with Discord.
        </p>
        <p>
          This website is made available under the terms of the MIT license.
        </p>
      </footer>
    </Box>
  );
}

export default App;
