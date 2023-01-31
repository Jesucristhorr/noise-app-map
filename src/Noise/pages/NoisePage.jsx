import { AddOutlined } from "@mui/icons-material";
import { IconButton, Tooltip, Typography } from "@mui/material";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getUserLocation } from "../../helpers/getUserLocation";
import { setUserLocation } from "../../store/map/mapSlice";
import { getUserLocation } from "../../store/map/thunks";
import { MapView } from "../components/MapView";
import { NoiseLayout } from "../layout/NoiseLayout";

export const NoisePage = () => {
  const { isLoading, userLocation } = useSelector((state) => state.map);
  const dispatch = useDispatch();
  // console.log(`coords ${userLocation}`);

  //obtener la geolocalizacion de la persona
  useEffect(() => {
    // getUserLocation().then((lnglat) => dispatch(setUserLocation(lnglat)));
    dispatch(getUserLocation());
  }, []);

  return (
    <NoiseLayout>
      {/* <Typography>lorem ipsu sndas asd asd asd as d asd as asd asd </Typography> */}

      {/* MAPA */}
      <MapView />

      {/* BOTON FLOTANTE */}
      <Tooltip title="Agregar Sensor">
        <IconButton
          size="large"
          sx={{
            color: "white",
            backgroundColor: "primary.main",
            ":hover": { backgroundColor: "primary.main", opacity: 0.9 },
            position: "fixed",
            right: 50,
            bottom: 50,
          }}
        >
          <AddOutlined sx={{ fontSize: 30 }} />
        </IconButton>
      </Tooltip>
    </NoiseLayout>
  );
};
