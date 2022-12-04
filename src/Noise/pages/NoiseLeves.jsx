import { Search } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import { Charts } from "../components/Charts";
import { NoiseLayout } from "../layout/NoiseLayout";

export const NoiseLeves = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
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
            <TextField
              sx={{ width: "300px" }}
              fullWidth
              // label="Fecha"
              id="datefl"
              type="date"
              {...register("datefl")}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              label="Lugar"
              id="place"
              sx={{ width: "300px" }}
              {...register("place")}
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
