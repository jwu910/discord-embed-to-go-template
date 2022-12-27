import { Box, Stack } from "@mui/material";
import React, { useState } from "react";
import "./App.scss";

function App() {
  const [inputValue, setInputValue] = React.useState("");
  
  const handleJSONInput = (json: string): string => {
    return "";
  };

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
