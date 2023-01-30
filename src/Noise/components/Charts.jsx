import { Box, Typography } from "@mui/material";
import { BarChart } from "./BarChart";
import { useState } from "react";
import { width } from "@mui/system";
import { LineChart } from "./LineChart";

const dataset2 = [
  {
    id: 1,
    hora: "00:06",
    decibelios: 64.44,
  },
  {
    id: 3,
    hora: "01:18",
    decibelios: 65.56,
  },
  {
    id: 4,
    hora: "01:59",
    decibelios: 69.65,
  },
  {
    id: 5,
    hora: "02:41",
    decibelios: 64.63,
  },
  {
    id: 6,
    hora: "09:10",
    decibelios: 64.86,
  },
  {
    id: 7,
    hora: "09:51",
    decibelios: 63.57,
  },
  {
    id: 8,
    hora: "10:33",
    decibelios: 64.08,
  },
  {
    id: 9,
    hora: "11:14",
    decibelios: 65.17,
  },
];

const dataset3 = [
  {
    id: 1,
    hora: "00:06",
    decibelios: 45,
  },
  {
    id: 3,
    hora: "01:18",
    decibelios: 45,
  },
  {
    id: 4,
    hora: "01:59",
    decibelios: 45,
  },
  {
    id: 5,
    hora: "02:41",
    decibelios: 45,
  },
  {
    id: 6,
    hora: "09:10",
    decibelios: 45,
  },
  {
    id: 7,
    hora: "09:51",
    decibelios: 55,
  },
  {
    id: 8,
    hora: "10:33",
    decibelios: 55,
  },
  {
    id: 9,
    hora: "11:14",
    decibelios: 55,
  },
];

export const Charts = () => {
  const [userData, setUserData] = useState({
    labels: dataset2.map((data) => data.hora),
    datasets: [
      {
        // fill: true,
        label: "Niveles de Ruido (dB)",
        data: dataset2.map((data) => data.decibelios),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 2,
      },
      {
        fill: true,
        label: "Nivel máximo recomendado (dB) TULSMA 2015",
        data: dataset3.map((data) => data.decibelios),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderColor: "rgb(53, 162, 235)",
        borderWidth: 2,
      },
    ],
  });
  return (
    <>
      {/* <Typography variant="h6">Este apartado es para graficos</Typography> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: { sm: "960px", xs: "343px" },
          margin: "70px auto",
        }}
      >
        {/* <BarChart chartData={userData} /> */}
        <LineChart chartData={userData} />
      </Box>
    </>
  );
};
