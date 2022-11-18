import {
  MenuOutlined,
  NoiseControlOff,
  Person,
  Sensors,
  TurnedInNot,
} from "@mui/icons-material";
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
import MapIcon from "@mui/icons-material/Map";
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
                <NoiseControlOff color="primary" />
              </ListItemIcon>
              <Grid container>
                {/* <ListItemText primary={"hola"} /> */}
                <NavLink
                  to="/information"
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
