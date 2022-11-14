import { Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { SideBar } from "../components/SideBar";

const drawerWidth = 240;

export const NoiseLayout = ({ children }) => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        {/* Navbar drawerWidth */}
        <NavBar drawerWidth={drawerWidth} />

        {/* Sidebar drawerWidth */}
        <SideBar drawerWidth={drawerWidth} />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {/* Toolbar */}
          <Toolbar />
          {children}
        </Box>
      </Box>
      {/* <Footer /> */}
    </>
  );
};
