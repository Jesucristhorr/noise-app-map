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
  Avatar,
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
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import MapIcon from "@mui/icons-material/Map";
import { NavLink } from "react-router-dom";
import { fontSize } from "@mui/system";
import { useDispatch } from "react-redux";
import { startLogout } from "../../store/auth";

export const NavBar = ({ drawerWidth = 240 }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onLogout = () => {
    dispatch(startLogout());
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#fff",
        }}
      >
        <Toolbar>
          <IconButton
            onClick={handleDrawerOpen}
            color="inherit"
            edge="start"
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuOutlined sx={{ color: "primary" }} color="primary" />
          </IconButton>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            {/*  */}
            <Grid container>
              <Grid display={{ xs: "none", md: "block" }}>
                <img
                  src="https://ik.imagekit.io/hpmztn0eqra/LOGO-ULEAM-HORIZONTAL__2__FhP2OS__w.png?ik-sdk-version=javascript-1.4.3&updatedAt=1609347141336"
                  style={{ width: "150px" }}
                />
              </Grid>
              <Grid>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ color: "#000", fontWeight: "bold" }}
                >
                  Facultad de Ciencias Informáticas
                </Typography>
                <Typography sx={{ color: "gray", fontSize: "12px" }}>
                  Medición de Ruido Ambiental
                </Typography>
              </Grid>
            </Grid>
            {/*  */}
            {/* <IconButton color="primary">
              <LogoutOutlined />
            </IconButton> */}
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ bgcolor: "#2AB0C3", marginRight: "10px" }}>JI</Avatar>
            <Typography variant="p" noWrap component="div">
              Jennifer Intriago
            </Typography>
            <IconButton
              edge="end"
              onClick={handleDrawerClose}
              sx={{ color: "#17A9BF" }}
            >
              <ArrowBackIosIcon />
            </IconButton>
          </Box>
        </Toolbar>
        <Box sx={{ margin: "0 auto" }}>
          <IconButton onClick={onLogout}>
            <LogoutOutlined color="inherit" />
            <Typography sx={{ fontSize: "14px", color: "gray" }}>
              Cerrar Sesión
            </Typography>
          </IconButton>

          {/* <NavLink
            to="/auth/login"
            style={{ textDecoration: "none", color: "black" }}
          >
            <Typography sx={{ fontSize: "14px", color: "gray" }}>
              Cerrar Sesión
            </Typography>
          </NavLink> */}
        </Box>
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
