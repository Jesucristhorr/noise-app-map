import { MenuOutlined, TurnedInNot } from "@mui/icons-material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
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

export const MobileNav = ({ drawerWidth, toggle }) => {
  const [open, setOpen] = useState(toggle);
  const handleDrawerClose = () => {
    console.log("cerrando...");
    setOpen(false);
  };
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="persistent"
        open={open}
        sx={{
          //   display: { sm: "block", xs: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          // display: { xs: "none" },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Jennifer Intriago
          </Typography>
          <IconButton
            color="inherit"
            edge="end"
            sx={{ mr: 2, display: { sm: "none" } }}
            onClick={handleDrawerClose}
          >
            <ArrowBackIosIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List>
          {/*  */}
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <MapIcon color="primary" />
              </ListItemIcon>
              <Grid container>
                {/* <ListItemText primary={"hola"} /> */}
                <NavLink
                  to="/"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <ListItemText primary={"Mapa"} />
                </NavLink>
              </Grid>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InfoOutlined color="primary" />
              </ListItemIcon>
              <Grid container>
                {/* <ListItemText primary={"hola"} /> */}
                <NavLink
                  to="/information"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <ListItemText primary={"Información"} />
                </NavLink>
              </Grid>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <NoiseControlOff color="primary" />
              </ListItemIcon>
              <Grid container>
                {/* <ListItemText primary={"hola"} /> */}
                <NavLink
                  to="/noise-leves"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <ListItemText primary={"Niveles de ruido"} />
                </NavLink>
              </Grid>
            </ListItemButton>
          </ListItem>
          {/*  */}
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Sensors color="primary" />
              </ListItemIcon>
              <Grid container>
                {/* <ListItemText primary={"hola"} /> */}
                <NavLink
                  to="/manage-sensors"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <ListItemText primary={"Administrar Sensores"} />
                </NavLink>
              </Grid>
            </ListItemButton>
          </ListItem>
          {/*  */}

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Person color="primary" />
              </ListItemIcon>
              <Grid container>
                {/* <ListItemText primary={"hola"} /> */}
                <NavLink
                  to="/"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <ListItemText primary={"Administrar Usuarios"} />
                </NavLink>
              </Grid>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};
