import {
  InfoOutlined,
  LogoutOutlined,
  MenuOutlined,
  NoiseControlOff,
  Person,
  Sensors,
  TurnedInNot,
} from "@mui/icons-material";
import {
  AppBar,
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
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import MapIcon from "@mui/icons-material/Map";
import { NavLink } from "react-router-dom";

export const NavBar = ({ drawerWidth = 240 }) => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            onClick={handleDrawerOpen}
            color="inherit"
            edge="start"
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuOutlined color="blanco" />
          </IconButton>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ color: "#fff" }}
            >
              Noise App
            </Typography>
            <IconButton color="blanco">
              <LogoutOutlined />
            </IconButton>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        open={open}
        sx={{
          // display: { sm: "block", xs: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          // display: { xs: "none" },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Jennifer Intriago
          </Typography>
          {/*  */}
          <IconButton
            edge="end"
            onClick={handleDrawerClose}
            sx={{ color: "#17A9BF" }}
          >
            <ArrowBackIosIcon />
          </IconButton>
          {/*  */}
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
    </>
  );
};
