import { Box, Typography } from "@mui/material";
import React from "react";
import { Line } from "react-chartjs-2";
import { getHoursMinutes } from "../../helpers/getHoursMinutes";

export const LineMetricChart = ({ metric, sensor }) => {
  let metricasBdd = metric.filter((m) => m.sensorId === sensor.id);
  const lineChart = {
    labels: metricasBdd.map((m) => getHoursMinutes(m.createdAt)), //horas
    datasets: [
      {
        fill: true,
        label: `Niveles de Ruido (dB)`,
        data: metricasBdd.map((m) => m.value),
        backgroundColor: "#07B8AF",
        borderColor: "#07B8AF",
        borderWidth: 2,
      },
    ],
  };
  return (
    <>
      <Box width="100%" sx={{ marginBottom: "80px" }}>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold", color: "#747d8c" }}
        >
          Niveles de ruido obtenidos del sensor: {sensor.name} (ID: {sensor.id})
        </Typography>
        <Line data={lineChart} />
      </Box>
    </>
  );
};
