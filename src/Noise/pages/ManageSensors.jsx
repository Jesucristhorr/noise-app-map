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
  Divider,
  Grid,
  IconButton,
  MenuItem,
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
import { setUserLocation, updateSensor } from "../../store/map/mapSlice";
import {
  getUserLocation,
  startLoadingProtocols,
  startLoadingSensors,
  startLoadingSensorTypes,
  startNewSensor,
} from "../../store/map/thunks";
import { Alerts } from "../components/Alerts";
import { TableSensors } from "../components/TableSensors";
import { NoiseLayout } from "../layout/NoiseLayout";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { setAjv } from "@jsonforms/core";
import Ajv from "ajv";
import AjvErrors from "ajv-errors";
import { JsonForms } from "@jsonforms/react";
import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";

const ajv = new Ajv({ allErrors: true, verbose: true, strict: false });
const ajv2 = AjvErrors(ajv);

export const ManageSensors = () => {
  setAjv(ajv2);
  const {
    isLoading,
    userLocation,
    sensors,
    protocols,
    sensorTypes,
    isSaving,
    messageSaved,
    messageDelete,
    messageUpdated,
    messageError,
  } = useSelector((state) => state.map);

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // alerta
  const handleCloseAlert = () => setOpenAlert(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openAlertDelete, setOpenAlertDelete] = useState(true);
  const [openAlertUpdate, setOpenAlertUpdate] = useState(true);
  const [loadingSensors, setOpenLoadingSensors] = useState(false);
  const [savingSensor, setSavingSensor] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      type: "NOISE",
      measurementUnit: "",
      measurementKeyName: "",
      locationName: "",
      longitude: 0,
      latitude: 0,
      protocolId: 1,
      connectionData: {},
    },
  });

  const handleUserLocationInForm = () => {
    setValue("longitude", userLocation[0]);
    setValue("latitude", userLocation[1]);
  };

  useEffect(() => {
    dispatch(startLoadingSensors()).then(() => {
      dispatch(startLoadingProtocols()).then(() => {
        dispatch(startLoadingSensorTypes()).then(() => {
          setOpenLoadingSensors(false);
        });
      });
    });
    setOpenLoadingSensors(true);
  }, []);

  const protocolId = watch("protocolId");

  return (
    <>
      <NoiseLayout>
        {loadingSensors && (
          <Box sx={{ position: "absolute", top: "20%", left: "50%" }}>
            <CircularProgress color="primary" />
          </Box>
        )}
        <Button variant="contained" onClick={handleOpen} sx={{ color: "#fff" }}>
          Agregar Sensor
        </Button>

        {/* SPINNER CUANDO SE GUARDA */}
        {savingSensor && (
          <Box sx={{ position: "absolute", top: "20%", left: "50%" }}>
            <CircularProgress color="primary" />
          </Box>
        )}
        <Collapse in={openAlert}>
          {!!messageSaved ? (
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
          ) : (
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
              severity="error"
              sx={{
                mt: 2,
                width: "100%",
                // display: isSaving ? "inherit" : "none",
                // display: "none",
              }}
            >
              <AlertTitle>Error</AlertTitle>
              {messageError}
            </Alert>
          )}
        </Collapse>

        {!!messageUpdated ? (
          <Collapse in={openAlertUpdate}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenAlertUpdate(false);
                  }}
                >
                  <CloseOutlined />
                </IconButton>
              }
              severity="info"
              sx={{
                mt: 2,
                width: "100%",
                // display: isSaving ? "inherit" : "none",
                // display: "none",
              }}
            >
              <AlertTitle>Actualizado</AlertTitle>
              {messageUpdated}
            </Alert>
          </Collapse>
        ) : (
          ""
        )}

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
              severity="success"
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
            // sx={{ height: "100%", overflowY: "scroll" }}
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
                overflowY: "scroll",
                p: 4,
                width: { xs: "350px", md: "700px", lg: "900px" },
                height: "90%",
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
                  // console.log(data);
                  dispatch(startNewSensor(data)).then(() => {
                    setOpenAlert(true);
                    setSavingSensor(false);

                    dispatch(startLoadingSensors());
                  });
                  setOpen(false);
                  setSavingSensor(true);
                  reset();
                })}
              >
                <Divider
                  textAlign="left"
                  sx={{
                    mt: 1,
                    fontWeight: "bold",
                    color: "#073940",
                  }}
                >
                  Información del Sensor
                </Divider>
                <Grid container>
                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <TextField
                      label="Sensor"
                      type="text"
                      placeholder="AWE34TC"
                      fullWidth
                      size="small"
                      // id="filled-hidden-label-small"
                      {...register("name", {
                        required: "Campo requerido",
                        minLength: 5,
                      })}
                      error={!!errors.name}
                      helperText={errors.name ? "Campo requerido" : ""}
                    />
                  </Grid>

                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <TextField
                      label="Tipo de sensor"
                      select
                      defaultValue={"NOISE"}
                      fullWidth
                      size="small"
                      // id="filled-hidden-label-small"
                      {...register("type", {
                        required: "Campo requerido",
                      })}
                      helperText={errors.type ? "Campo requerido" : ""}
                      error={!!errors.type}
                    >
                      {sensorTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>

                <Grid item xs={12} sx={{ mt: 2 }}>
                  <TextField
                    label="Descripción"
                    type="text"
                    placeholder="Mide el ruido ambiental"
                    fullWidth
                    size="small"
                    // id="filled-hidden-label-small"
                    {...register("description", {
                      minLength: {
                        value: 5,
                        message:
                          "La descripción debe ser de al menos 5 caracteres",
                      },
                    })}
                    helperText={errors.description ? "Campo requerido" : ""}
                    error={!!errors.description}
                  />
                </Grid>

                <Grid item xs={12} sx={{ mt: 2 }}>
                  <TextField
                    label="Unidad de Medida"
                    type="text"
                    placeholder="dB(A)"
                    fullWidth
                    size="small"
                    // id="filled-hidden-label-small"
                    {...register("measurementUnit", {
                      required: "Campo requerido",
                      minLength: {
                        value: 1,
                        message:
                          "La unidad de medida debe tener al menos un caracter",
                      },
                    })}
                    error={!!errors.measurementUnit}
                    helperText={errors.measurementUnit ? "Campo requerido" : ""}
                  />
                </Grid>

                <Grid item xs={12} sx={{ mt: 2 }}>
                  <TextField
                    label="Nombre de la llave JSON con datos de medición"
                    type="text"
                    placeholder="Ej. measurement"
                    fullWidth
                    size="small"
                    // id="filled-hidden-label-small"
                    {...register("measurementKeyName", {
                      minLength: 1,
                      maxLength: 100,
                    })}
                    error={!!errors.measurementKeyName}
                    helperText={
                      errors.measurementKeyName ? "Campo requerido" : ""
                    }
                  />
                </Grid>

                <Grid item xs={12} sx={{ mt: 2 }}>
                  <TextField
                    // no mayor a 100 caracteres
                    label="Lugar"
                    type="text"
                    placeholder="Ejemplo: Facultad de Ciencias de la Vida y Tecnologías"
                    fullWidth
                    size="small"
                    // id="filled-hidden-label-small"
                    {...register("locationName", {
                      required: "Campo requerido",
                      minLength: 5,
                      maxLength: 99,
                    })}
                    error={!!errors.locationName}
                    helperText={errors.locationName ? "Campo requerido" : ""}
                  />
                </Grid>

                <Grid container justifyContent="space-between">
                  <Grid item xs={5} sx={{ mt: 2 }}>
                    <TextField
                      label="Longitud"
                      type="text"
                      placeholder="0.987890"
                      fullWidth
                      size="small"
                      // id="filled-hidden-label-small"
                      {...register("longitude", {
                        required: "Campo requerido",
                        pattern:
                          /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/,
                      })}
                      error={!!errors.longitude}
                      helperText={errors.longitude ? "Campo inválido" : ""}
                      // value={userLocation[0] ? userLocation[0] : ""}
                    />
                  </Grid>

                  <Grid item xs={5} sx={{ mt: 2 }}>
                    <TextField
                      label="Latitud"
                      type="text"
                      placeholder="2.987890"
                      fullWidth
                      size="small"
                      // id="filled-hidden-label-small"
                      {...register("latitude", {
                        required: "Campo requerido",
                        pattern:
                          /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/,
                      })}
                      error={!!errors.latitude}
                      helperText={errors.latitude ? "Campo inválido" : ""}
                      // value={userLocation[1] ? userLocation[1] : ""}
                    />
                  </Grid>
                  <Grid item xs={1} sx={{ mt: 2, mr: 2 }}>
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

                  {/* TODO: NUEVOS CAMPOS */}

                  <Divider
                    textAlign="left"
                    sx={{
                      mt: 2,
                      mb: 2,
                      width: "100%",
                      fontWeight: "bold",
                      color: "#073940",
                    }}
                  >
                    Configuración del Sensor
                  </Divider>

                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <TextField
                      label="Protocolo de conexión"
                      select
                      defaultValue={1}
                      placeholder="Ejemplo: MQTT"
                      fullWidth
                      size="small"
                      // id="filled-hidden-label-small"
                      {...register("protocolId", {
                        required: "Campo requerido",
                      })}
                      helperText={errors.protocolId ? "Campo requerido" : ""}
                      error={!!errors.protocolId}
                    >
                      {protocols.map(({ id: protocolId, protocol }) => (
                        <MenuItem key={protocolId} value={protocolId}>
                          {protocol}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
                {/*  */}

                {protocolId
                  ? protocols
                      .filter(({ id }) => Number(id) === Number(protocolId))
                      .map(
                        ({
                          connectionDetail: {
                            dataSchema,
                            uiSchema,
                            initialData,
                          },
                          id,
                          protocol,
                        }) => (
                          <Grid
                            key={`${id}-${protocol}`}
                            item
                            xs={12}
                            sx={{ mt: 2 }}
                          >
                            <JsonForms
                              schema={dataSchema}
                              uischema={uiSchema}
                              data={initialData}
                              renderers={materialRenderers}
                              cells={materialCells}
                              vald
                              onChange={({ data, errors }) => {
                                setValue("connectionData", { ...data });
                              }}
                            ></JsonForms>
                          </Grid>
                        )
                      )
                  : null}

                {/*  */}
                <Grid container sx={{ mb: 2, mt: 1, justifyContent: "center" }}>
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
              </form>
            </Box>
          </Modal>
        </div>
        {/* Tabla de sensores */}
        <TableSensors
          sensors={sensors}
          savingSensor={savingSensor}
          loadingSensors={loadingSensors}
          setSavingSensor={setSavingSensor}
        />
      </NoiseLayout>
      {/* {openAlert && <Alerts alert={true} />} */}
    </>
  );
};
