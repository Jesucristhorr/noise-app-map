import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { cyanTheme } from "./";

export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={cyanTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
