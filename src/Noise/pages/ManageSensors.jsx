import { AddLocationAlt, MenuOutlined } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Modal,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setUserLocation } from "../../store/map/mapSlice";
import { getUserLocation } from "../../store/map/thunks";
import { Alerts } from "../components/Alerts";
import { NoiseLayout } from "../layout/NoiseLayout";

export const ManageSensors = () => {
  const { isLoading, userLocation } = useSelector((state) => state.map);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // alerta
  const [openAlert, setOpenAlert] = useState(false);
  const handleCloseAlert = () => setOpenAlert(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const handleUserLocationInForm = () => {
    dispatch(getUserLocation());
  };

  return (
    <>
      <NoiseLayout>
        <Button variant="contained" onClick={handleOpen} sx={{ color: "#fff" }}>
          Agregar Sensor
        </Button>
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "#fff",
                border: "1px solid ##dfe6e9",
                borderRadius: "7px",
                boxShadow: 24,
                p: 4,
                width: { xs: "350px", md: "700px" },
              }}
            >
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                color="primary"
              >
                Ingresar Nuevo Sensor
              </Typography>
              <form
                onSubmit={handleSubmit((data) => {
                  console.log(data);
                  // mostrar alerta
                  reset();
                  setOpen(false);
                  // setOpenAlert(true);
                })}
              >
                <Grid container>
                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <TextField
                      label="Sensor"
                      type="text"
                      placeholder="AWE34TC"
                      fullWidth
                      {...register("sensor", { required: "Campo requerido" })}
                      error={!!errors.sensor}
                      helperText={errors.sensor ? "Campo requerido" : ""}
                    />
                  </Grid>

                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <TextField
                      label="Nombre"
                      type="text"
                      placeholder="Arduino Nano"
                      fullWidth
                      {...register("nombre", { required: "Campo requerido" })}
                      error={!!errors.nombre}
                      helperText={errors.nombre ? "Campo requerido" : ""}
                    />
                  </Grid>

                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <TextField
                      label="Descripción"
                      type="text"
                      placeholder="Mide el ruido ambiental"
                      fullWidth
                      {...register("description", {
                        required: "Campo requerido",
                      })}
                      error={!!errors.description}
                      helperText={errors.description ? "Campo requerido" : ""}
                    />
                  </Grid>

                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <TextField
                      label="Unidad de Medida"
                      type="text"
                      placeholder="dB(A)"
                      fullWidth
                      {...register("unit", { required: "Campo requerido" })}
                      error={!!errors.unit}
                      helperText={errors.unit ? "Campo requerido" : ""}
                    />
                  </Grid>

                  <Grid container justifyContent="space-between">
                    <Grid item xs={5} sx={{ mt: 2 }}>
                      <TextField
                        label="Longitud"
                        type="text"
                        placeholder="0987890"
                        fullWidth
                        {...register("longitude", {
                          required: "Campo requerido",
                        })}
                        error={!!errors.longitude}
                        helperText={errors.longitude ? "Campo requerido" : ""}
                        value={userLocation[0] ? userLocation[0] : ""}
                      />
                    </Grid>

                    <Grid item xs={5} sx={{ mt: 2 }}>
                      <TextField
                        label="Latitud"
                        type="text"
                        placeholder="0987890"
                        fullWidth
                        {...register("latitude", {
                          required: "Campo requerido",
                        })}
                        error={!!errors.latitude}
                        helperText={errors.latitude ? "Campo requerido" : ""}
                        value={userLocation[1] ? userLocation[1] : ""}
                      />
                    </Grid>
                    <Grid item xs={1} sx={{ mt: 2.4, mr: 2 }}>
                      <Tooltip title="Fija ubicación actual">
                        <IconButton
                          color="inherit"
                          edge="start"
                          onClick={handleUserLocationInForm}
                        >
                          <AddLocationAlt sx={{ fontSize: 35 }} />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                  {/*  */}

                  {isLoading ? (
                    <Alert
                      severity="info"
                      sx={{
                        mt: 2,
                        width: "100%",
                        // display: isLoading ? "inherit" : "none",
                        // display: "none",
                      }}
                    >
                      <AlertTitle>Sin coordenadas asignadas</AlertTitle>
                      De clic al botón para tomar ubicación actual
                    </Alert>
                  ) : (
                    <Alert
                      severity="success"
                      sx={{
                        mt: 2,
                        width: "100%",
                        // display: isLoading ? "inherit" : "none",
                        // display: "none",
                      }}
                    >
                      <AlertTitle>Listo</AlertTitle>
                      Geolocalización asignada
                    </Alert>
                  )}

                  {/*  */}
                  <Grid
                    container
                    sx={{ mb: 2, mt: 1, justifyContent: "center" }}
                  >
                    <Grid item xs={12} sm={6}>
                      <Button
                        variant="contained"
                        fullWidth
                        type="submit"
                        sx={{ color: "#fff" }}
                      >
                        <Typography>Guardar</Typography>
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Modal>
        </div>
      </NoiseLayout>
      {/* {openAlert && <Alerts alert={true} />} */}
    </>
  );
};
