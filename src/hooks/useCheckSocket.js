import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/auth";
import { getToken } from "../helpers/getToken";
import { getUser } from "../helpers/getUser";
import { io } from "socket.io-client";

export const useCheckSocket = () => {
  const [data, setData] = useState([]);
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
      // console.log(dataSensor);
      // setData([...data, dataSensor]);
      setData((currentData) => [...currentData, dataSensor]);
    });
  }, []);

  return {
    data,
  };
};
