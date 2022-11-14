import { Typography } from "@mui/material";
import { Map } from "mapbox-gl";
import { useLayoutEffect, useRef } from "react";
import { Footer } from "../components/Footer";
import { NoiseLayout } from "../layout/NoiseLayout";

export const NoisePage = () => {
  const mapDiv = useRef(null);

  useLayoutEffect(() => {
    const map = new Map({
      container: mapDiv.current, // container ID
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [-80.7131355321545, -0.9538658429270971], // starting position [lng, lat]
      zoom: 15, // starting zoom
      projection: "globe", // display the map as a 3D globe
    });
    map.on("style.load", () => {
      map.setFog({}); // Set the default atmosphere style
    });
  }, []);
  return (
    <NoiseLayout>
      {/* <Typography>lorem ipsu sndas asd asd asd as d asd as asd asd </Typography> */}
      {/* MAPA */}
      <div
        ref={mapDiv}
        style={{
          height: "100vh",
          width: "100%",
          position: "fixed",
          top: "0",
          left: "0",
        }}
      ></div>
    </NoiseLayout>
  );
};
