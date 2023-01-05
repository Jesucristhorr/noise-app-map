import { Box, Typography } from "@mui/material";
import { BarChart } from "./BarChart";
import { useState } from "react";
import { width } from "@mui/system";

const dataset = [
  {
    id: 1,
    year: 2016,
    userGain: 80000,
    userLost: 823,
  },
  {
    id: 2,
    year: 2017,
    userGain: 45677,
    userLost: 345,
  },
  {
    id: 3,
    year: 2018,
    userGain: 78888,
    userLost: 555,
  },
  {
    id: 4,
    year: 2019,
    userGain: 90000,
    userLost: 4555,
  },
  {
    id: 5,
    year: 2020,
    userGain: 4300,
    userLost: 234,
  },
];

export const Charts = () => {
  const [userData, setUserData] = useState({
    labels: dataset.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: dataset.map((data) => data.userGain),
        backgroundColor: ["#74b9ff", "#dfe6e9"],
      },
    ],
  });
  return (
    <>
      <Typography variant="h6">Este apartado es para graficos</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "800px",
        }}
      >
        <BarChart chartData={userData} />
      </Box>
    </>
  );
};
