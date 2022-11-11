import { createTheme } from "@mui/material";
import { cyan, indigo, red } from "@mui/material/colors";

export const cyanTheme = createTheme({
  palette: {
    primary: {
      main: "#15AABF",
    },
    secondary: {
      main: "#7950F2",
    },
    error: {
      main: red.A400,
    },
    blanco: {
      main: "#fff",
    },
  },
});
