import { Search } from "@mui/icons-material";
import { Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Charts } from "../components/Charts";
import { NoiseLayout } from "../layout/NoiseLayout";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { getToken } from "../../helpers/getToken";

export const NoiseLeves = () => {
  const { sensors } = useSelector((state) => state.map);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // const [isConnected, setIsConnected] = useState(socket.connected);
  useEffect(() => {
    const authToken = getToken();
    const socket = io("wss://iot-api.codefilia.com", {
      auth: { token: authToken },
    });

    socket.on("connect", () => {
      console.log("Connected to socket");
      // socket.emit("authenticate", { token: authToken });
    });

    socket.on("sensor-data", (data) => {
      console.log(data);
    });
  }, []);

  return (
    <NoiseLayout>
      <Typography variant="h4" color={"primary"} sx={{ fontWeight: "bold" }}>
        MONITOREO DE RUIDO AMBIENTAL EN MANTA
      </Typography>
      <Typography variant="h6">Ruido en Manta</Typography>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <Grid
          sx={{}}
          container
          direction="row"
          flexWrap="wrap"
          columns={{ sm: 4, lg: 12 }}
          // justifyContent="space-between"
          alignItems="center"
          rowSpacing={2}
          columnSpacing={2}
        >
          <Grid item>
            {/* <TextField
              sx={{ width: "300px" }}
              fullWidth
              // label="Fecha"
              id="datefl"
              type="date"
              {...register("datefl")}
            /> */}
          </Grid>
          <Grid item>
            {/* <TextField
              fullWidth
              label="Lugar"
              select
              defaultValue=""
              id="place"
              sx={{ width: "300px" }}
              {...register("place")}
            >
              {sensors.map((option) => (
                <MenuItem key={option.sensor} value={option.place}>
                  {option.place}
                </MenuItem>
              ))}
            </TextField> */}

            <TextField
              sx={{ width: "300px" }}
              fullWidth
              // label="Fecha"
              id="datefl"
              // type="datetime"
              type="datetime-local"
              {...register("dateTimefl")}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" sx={{ color: "#fff" }} type="submit">
              <Search />
              Buscar
            </Button>
          </Grid>
        </Grid>
      </form>
      {/* Charts */}
      <Charts />
    </NoiseLayout>
  );
};
