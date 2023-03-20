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
import MapIcon from "@mui/icons-material/Map";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../store/auth";
import { useCheckAuth } from "../../hooks/useCheckAuth";

export const SideBar = ({ drawerWidth = 240, open }) => {
  const { displayName, role } = useSelector((state) => state.auth);

  const { status } = useCheckAuth();
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(startLogout({ errorMessage: "" }));
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  const getAvatarInitials = (fullName) => {
    const [firstName = "S", lastName = ""] = fullName.split(" ");

    return `${firstName.at(0)}${lastName.at(0)}`;
  };

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
          {status === "authenticated" ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Avatar
                sx={{
                  bgcolor: stringToColor(displayName),
                  marginRight: "10px",
                }}
              >
                {getAvatarInitials(displayName)}
              </Avatar>
              <Typography variant="p" noWrap component="div">
                {displayName}
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ bgcolor: "#2AB0C3", marginRight: "10px" }}>
                I
              </Avatar>
              <Typography variant="p" noWrap component="div">
                Invitado
              </Typography>
            </Box>
          )}
        </Toolbar>
        <Box sx={{ margin: "0 auto" }}>
          {status === "authenticated" ? (
            <IconButton onClick={onLogout}>
              <LogoutOutlined color="inherit" />
              <Typography sx={{ fontSize: "14px", color: "gray" }}>
                Cerrar Sesión
              </Typography>
            </IconButton>
          ) : (
            <NavLink
              to="/auth/login"
              style={{ textDecoration: "none", color: "black" }}
            >
              <Typography sx={{ fontSize: "14px", color: "gray" }}>
                Iniciar Sesión
              </Typography>
            </NavLink>
          )}
        </Box>
        <Divider />
        <List>
          {/*  */}
          <NavLink to="/" style={{ textDecoration: "none", color: "black" }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <MapIcon color="primary" />
                </ListItemIcon>
                <Grid container>
                  {/* <ListItemText primary={"hola"} /> */}
                  <ListItemText primary={"Mapa"} />
                </Grid>
              </ListItemButton>
            </ListItem>
          </NavLink>

          {status === "authenticated" ? (
            <NavLink
              to="/noise-leves"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <NoiseControlOff color="primary" />
                  </ListItemIcon>
                  <Grid container>
                    {/* <ListItemText primary={"hola"} /> */}
                    <ListItemText primary={"Mediciones"} />
                  </Grid>
                </ListItemButton>
              </ListItem>
            </NavLink>
          ) : (
            <p></p>
          )}
          {/*  */}

          {status === "authenticated" && (role.id === 1 || role.id === 2) ? (
            <NavLink
              to="/manage-sensors"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Sensors color="primary" />
                  </ListItemIcon>
                  <Grid container>
                    <ListItemText primary={"Administrar Sensores"} />
                  </Grid>
                </ListItemButton>
              </ListItem>
            </NavLink>
          ) : (
            <p></p>
          )}

          {/*  */}

          {status === "authenticated" && role.id === 1 ? (
            <NavLink
              to="/manage-users"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Person color="primary" />
                  </ListItemIcon>
                  <Grid container>
                    <ListItemText primary={"Administrar Usuarios"} />
                  </Grid>
                </ListItemButton>
              </ListItem>
            </NavLink>
          ) : (
            <p></p>
          )}

          <NavLink
            to="/information"
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InfoOutlined color="primary" />
                </ListItemIcon>
                <Grid container>
                  {/* <ListItemText primary={"hola"} /> */}
                  <ListItemText primary={"Información"} />
                </Grid>
              </ListItemButton>
            </ListItem>
          </NavLink>
        </List>
      </Drawer>
    </Box>
  );
};
