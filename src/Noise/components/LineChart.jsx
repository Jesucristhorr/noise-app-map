import { Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { getHoursMinutes } from "../../helpers/getHoursMinutes";
import { Box } from "@mui/system";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const LineChart = ({ dataSensor, sensor }) => {
  let filtrarSensores = dataSensor.filter((d) => d.sensorId === sensor.id);
  // console.log(`FILTRADO SENSOR 1: ${JSON.stringify(filtrarSensores)}`);
  const lineChart = {
    labels: filtrarSensores.map((d) => getHoursMinutes(d.timestamp)), //horas
    datasets: [
      {
        fill: true,
        label: `${
          sensor.type === "NOISE"
            ? `Niveles de ruido (${sensor.measurementUnit})`
            : `Medición (${sensor.measurementUnit})`
        }`,
        data: filtrarSensores.map((d) => d.measurement),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderColor: "rgb(53, 162, 235)",
        borderWidth: 2,
      },
      // {
      //   fill: true,
      //   label: "Nivel máximo recomendado (dB) TULSMA 2015",
      //   data: dataset3.map((data) => data.decibelios),
      //   backgroundColor: "rgba(53, 162, 235, 0.5)",
      //   borderColor: "rgb(53, 162, 235)",
      //   borderWidth: 2,
      // },
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
