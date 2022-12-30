import { Box, Typography } from "@mui/material";
import React from "react";

export const PopupMap = ({ sensor }) => {
  return (
    <>
      <Typography variant="h3">Sensor: {sensor.sensor}</Typography>
      <Typography variant="p">Sensor: {sensor.nombre}</Typography>
      <Typography variant="p">Descripción: {sensor.description}</Typography>
      <Box
        sx={{
          width: 300,
          height: 300,
          backgroundColor: "primary",
          borderRadius: "90%",
        }}
      >
        <Typography variant="p">dB: 75dB (umbral de dolor)</Typography>
      </Box>
    </>
  );
};
