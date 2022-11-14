import { MenuOutlined, TurnedInNot } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export const SideBar = ({ drawerWidth = 240, open }) => {
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="persistent"
        open
        sx={{
          display: { sm: "block", xs: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          // display: { xs: "none" },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Jennifer Intriago
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {/*  */}
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <TurnedInNot />
              </ListItemIcon>
              <Grid container>
                {/* <ListItemText primary={"hola"} /> */}
                <NavLink to="/" style={{ textDecoration: "none" }}>
                  <ListItemText primary={"Mapa"} />
                </NavLink>
              </Grid>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <TurnedInNot />
              </ListItemIcon>
              <Grid container>
                {/* <ListItemText primary={"hola"} /> */}
                <NavLink to="/information" style={{ textDecoration: "none" }}>
                  <ListItemText primary={"Informacion"} />
                </NavLink>
              </Grid>
            </ListItemButton>
          </ListItem>

          {/*  */}
        </List>
      </Drawer>
    </Box>
  );
};
