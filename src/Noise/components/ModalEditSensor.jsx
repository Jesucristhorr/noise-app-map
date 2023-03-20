import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import { JsonForms } from "@jsonforms/react";
import { AddLocationAlt } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserLocation,
  startNewSensor,
  updateSensorForm,
} from "../../store/map/thunks";

export const ModalEditSensor = ({ open, setOpen, sensor }) => {
  const { userLocation, protocols, messageDelete, messageSaved } = useSelector(
    (state) => state.map
  );

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: sensor?.name,
      description: sensor?.description,
      measurementUnit: sensor?.measurementUnit,
      measurementKeyName: sensor?.measurementKeyName,
      locationName: sensor?.locationName,
      longitude: sensor?.longitude,
      latitude: sensor?.latitude,
      protocolId: sensor?.connectionTypeId ? sensor.connectionTypeId : 1,
      connectionData: sensor?.connectionData?.data
        ? sensor.connectionData.data
        : {},
    },
  });

  useEffect(() => {
    dispatch(getUserLocation());
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const protocolId = watch("protocolId");

  // setear valores
  useEffect(() => {
    if (!!sensor) {
      setValue("name", sensor?.name ? sensor.name : "");
      setValue("description", sensor?.description ? sensor.description : "");
      setValue(
        "measurementUnit",
        sensor?.measurementUnit ? sensor.measurementUnit : ""
      );
      setValue(
        "measurementKeyName",
        sensor?.measurementKeyName ? sensor.measurementKeyName : ""
      );
      setValue("longitude", sensor?.longitude ? sensor.longitude : "");
      setValue("latitude", sensor?.latitude ? sensor.latitude : "");
      setValue("locationName", sensor?.locationName ? sensor.locationName : "");
      setValue(
        "protocolId",
        sensor?.connectionTypeId ? sensor.connectionTypeId : 1
      );
      setValue(
        "connectionData",
        sensor?.connectionData?.data ? sensor.connectionData?.data : {}
      );
    }
  }, [sensor]);

  const handleUserLocationInForm = () => {
    setValue("longitude", userLocation[0]);
    setValue("latitude", userLocation[1]);
  };

  // useEffect(() => {
  //   if (messageDelete.length > 0) {
  //     Swal.fire("Sensor Borrado", messageDelete, "success");
  //   }
  // }, [messageDelete]);

  return (
    <>
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
            width: { xs: "350px", md: "700px", lg: "900px" },
            overflowY: "scroll",
            height: "90%",
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            color="primary"
          >
            Actualizar Sensor
          </Typography>
          <form
            onSubmit={handleSubmit((data) => {
              const { id } = sensor;
              const sensorToUpdate = {
                id,
                ...data,
                sensorOriginalData: { ...sensor },
              };

              dispatch(updateSensorForm(sensorToUpdate));
              // mostrar alerta
              reset();
              setOpen(false);
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
                    placeholder="0987890"
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
                    placeholder="0987890"
                    fullWidth
                    size="small"
                    // id="filled-hidden-label-small"
                    {...register("latitude", {
                      required: "Campo requerido",
                      pattern: /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/,
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
                    defaultValue={sensor?.connectionTypeId ?? 1}
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

              {sensor && protocolId
                ? protocols
                    .filter(({ id }) => Number(id) === Number(protocolId))
                    .map(
                      ({
                        connectionDetail: { dataSchema, uiSchema, initialData },
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
                            data={
                              sensor.connectionData?.data &&
                              sensor.connectionTypeId === protocolId
                                ? sensor.connectionData.data
                                : initialData
                            }
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
            </Grid>
          </form>
        </Box>
      </Modal>
    </>
  );
};
