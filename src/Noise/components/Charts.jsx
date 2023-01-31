import { Box, Typography } from "@mui/material";
import { BarChart } from "./BarChart";
import { useEffect, useState } from "react";
import { width } from "@mui/system";
import { LineChart } from "./LineChart";
import { io } from "socket.io-client";
import { getToken } from "../../helpers/getToken";
import { getHoursMinutes } from "../../helpers/getHoursMinutes";

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
  const [data, setData] = useState([]);
  useEffect(() => {
    const authToken = getToken();
    const socket = io("wss://iot-api.codefilia.com", {
      auth: { token: authToken },
    });

    socket.on("connect", () => {
      console.log("Connected to socket");
      // socket.emit("authenticate", { token: authToken });
    });

    socket.on("sensor-data", (dataSensor) => {
      // console.log(dataSensor);
      // setData([...data, dataSensor]);
      setData((currentData) => [...currentData, dataSensor]);
    });
  }, []);

  // console.log(data);
  // data.map((d) => {
  //   let horasSensor = getHoursMinutes(d.timestamp);
  //   console.log(d.measurement);
  // });

  const lineChart = {
    labels: data.map((d) => getHoursMinutes(d.timestamp)), //horas
    datasets: [
      {
        // fill: true,
        label: "Niveles de Ruido (dB)",
        data: data.map((d) => d.measurement),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgb(255, 99, 132)",
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
        <LineChart chartData={lineChart} />
      </Box>
    </>
  );
};
