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
        label: `${
          sensor.type === "NOISE"
            ? `Niveles de ruido (${sensor.measurementUnit})`
            : `Medición (${sensor.measurementUnit})`
        }`,
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
          {sensor.type === "NOISE"
            ? `Niveles de ruido obtenidos del sensor: "${sensor.name}" (ID: ${sensor.id})`
            : `Mediciones obtenidas del sensor tipo ${sensor.type}: "${sensor.name}" (ID: ${sensor.id})`}
        </Typography>
        <Line
          data={lineChart}
          options={{
            scales: {
              y: {
                min: 0,
                type: "linear",
                grace: "10%",
                beginAtZero: 0,
              },
            },
          }}
        />
      </Box>
    </>
  );
};
