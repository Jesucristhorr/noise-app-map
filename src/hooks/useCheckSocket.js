import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/auth";
import { getToken } from "../helpers/getToken";
import { getUser } from "../helpers/getUser";
import { io } from "socket.io-client";

export const useCheckSocket = () => {
  const [data, setData] = useState([]);
  const [lastSensorData, setLastSensorData] = useState([]);
  useEffect(() => {
    const authToken = getToken();
    const socket = io(import.meta.env.VITE_WEB_SOCKET_URL, {
      auth: { token: authToken },
    });

    socket.on("connect", () => {
      console.log("Connected to socket");
      // socket.emit("authenticate", { token: authToken });
    });

    socket.on("sensor-data", (dataSensor) => {
      setData((currentData) => [...currentData, dataSensor]);
      const cleanPreviousData = lastSensorData.filter(
        (sensorData) => sensorData.sensorId !== dataSensor.sensorId
      );
      cleanPreviousData.push({ ...dataSensor });
      setLastSensorData(() => [...cleanPreviousData]);
    });
  }, []);

  return {
    data,
    lastSensorData,
  };
};
