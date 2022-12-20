import {
  AddLocationAlt,
  CloseOutlined,
  ClosedCaption,
  DeleteOutline,
  Edit,
  MenuOutlined,
  UploadOutlined,
} from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Button,
  CircularProgress,
  Collapse,
  Grid,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setUserLocation } from "../../store/map/mapSlice";
import { getUserLocation, startNewNote } from "../../store/map/thunks";
import { Alerts } from "../components/Alerts";
import { TableSensors } from "../components/TableSensors";
import { NoiseLayout } from "../layout/NoiseLayout";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

export const ManageSensors = () => {
  const {
    isLoading,
    userLocation,
    sensors,
    isSaving,
    messageSaved,
    messageDelete,
  } = useSelector((state) => state.map);

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // alerta
  const handleCloseAlert = () => setOpenAlert(false);
  const [openAlert, setOpenAlert] = useState(isSaving);
  const [openAlertDelete, setOpenAlertDelete] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const handleUserLocationInForm = () => {
    setValue("longitude", userLocation[0]);
    setValue("latitude", userLocation[1]);
  };

  return (
    <>
      <NoiseLayout>
        <Button variant="contained" onClick={handleOpen} sx={{ color: "#fff" }}>
          Agregar Sensor
        </Button>

        <Collapse in={openAlert}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenAlert(false);
                }}
              >
                <CloseOutlined />
              </IconButton>
            }
            severity="success"
            sx={{
              mt: 2,
              width: "100%",
              // display: isSaving ? "inherit" : "none",
              // display: "none",
            }}
          >
            <AlertTitle>Guardado</AlertTitle>
            {messageSaved}
          </Alert>
        </Collapse>

        {!!messageDelete ? (
          <Collapse in={openAlertDelete}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenAlertDelete(false);
                  }}
                >
                  <CloseOutlined />
                </IconButton>
              }
              severity="error"
              sx={{
                mt: 2,
                width: "100%",
                // display: isSaving ? "inherit" : "none",
                // display: "none",
              }}
            >
              <AlertTitle>Eliminado</AlertTitle>
              {messageDelete}
            </Alert>
          </Collapse>
        ) : (
          ""
        )}

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
                  dispatch(startNewNote(data));
                  reset();
                  setOpen(false);
                  setOpenAlert(true);
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
                        // value={userLocation[0] ? userLocation[0] : ""}
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
                        // value={userLocation[1] ? userLocation[1] : ""}
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
        {/* Tabla de sensores */}
        <TableSensors sensors={sensors} />
      </NoiseLayout>
      {/* {openAlert && <Alerts alert={true} />} */}
    </>
  );
};
