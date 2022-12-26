import { Box, Stack } from "@mui/material";
import "./App.scss";
import TextAreaViewer from "./components/TextAreaViewer";

function App() {
  return (
    <Box>
      <Stack sx={{ m: "auto", d: "flex" }} direction="row" spacing={3}>
        <TextAreaViewer id="input"></TextAreaViewer>
        <TextAreaViewer id="output"></TextAreaViewer>
      </Stack>
    </Box>
  );
}

export default App;
