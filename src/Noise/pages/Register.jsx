import React, { useEffect, useState } from "react";
import { NoiseLayout } from "../layout/NoiseLayout";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Collapse,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  startCreatingUserWithEmailPassword,
  startLoadingUsers,
} from "../../store/auth";
import { CloseOutlined } from "@mui/icons-material";
import { TableUsers } from "../components/TableUsers";
import { getRoles } from "../../store/roles/thunk";

export const Register = () => {
  const {
    messageSaved,
    isSaving,
    users,
    errorMessage,
    messageResendEmail,
    messageErrorResendEmail,
  } = useSelector((state) => state.auth);
  const { roles } = useSelector((state) => state.role);

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [loadingUsers, setOpenLoadingUsers] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openAlert, setOpenAlert] = useState(false);

  const [openMsgEmail, setOpenMsgEmail] = useState(true);
  const [openMsgError, setOpenMsgError] = useState(true);

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(getRoles()).then(() => {
      setOpenLoadingUsers(false);
    });
    setOpenLoadingUsers(true);
  }, []);

  return (
    <>
      <NoiseLayout>
        {loadingUsers ? (
          <Box sx={{ position: "absolute", top: "50%", left: "50%" }}>
            <CircularProgress color="primary" />
          </Box>
        ) : (
          <p></p>
        )}

        <Box sx={{ display: "flex" }}>
          <Button
            variant="contained"
            onClick={handleOpen}
            disabled={loading}
            sx={{ color: "#fff" }}
          >
            Agregar Nuevo Usuario
          </Button>

          {loading && (
            <CircularProgress
              size={24}
              sx={{
                color: "primary",
                position: "absolute",
                top: "17%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>

        <Collapse in={openAlert}>
          {!!errorMessage ? (
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
              }}
            >
              <AlertTitle>Error</AlertTitle>
              {errorMessage}
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
              severity="success"
              sx={{
                mt: 2,
                width: "100%",
              }}
            >
              <AlertTitle>Guardado</AlertTitle>
              {messageSaved}
            </Alert>
          )}
        </Collapse>

        <Collapse in={openMsgError}>
          {!!messageErrorResendEmail ? (
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenMsgError(false);
                  }}
                >
                  <CloseOutlined />
                </IconButton>
              }
              severity="error"
              sx={{
                mt: 2,
                width: "100%",
              }}
            >
              <AlertTitle>Error</AlertTitle>
              {messageErrorResendEmail}
            </Alert>
          ) : (
            <p></p>
          )}
        </Collapse>

        <Collapse in={openMsgEmail}>
          {!!messageResendEmail ? (
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenMsgEmail(false);
                  }}
                >
                  <CloseOutlined />
                </IconButton>
              }
              severity="success"
              sx={{
                mt: 2,
                width: "100%",
              }}
            >
              <AlertTitle>Correo enviado</AlertTitle>
              {messageResendEmail}
            </Alert>
          ) : (
            <p></p>
          )}
        </Collapse>

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
                // overflowY: "scroll",
                p: 4,
                width: { xs: "350px", md: "700px", lg: "900px" },
                // height: "90%",
              }}
            >
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                color="primary"
              >
                Ingresar Nuevo usuario
              </Typography>
              <form
                onSubmit={handleSubmit((data) => {
                  // console.log(data);
                  dispatch(startCreatingUserWithEmailPassword(data)).then(
                    () => {
                      setOpenAlert(true);
                      setLoading(false);
                      dispatch(startLoadingUsers());
                    }
                  );

                  setLoading(true);
                  reset();
                  setOpen(false);
                })}
              >
                <Grid container>
                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <TextField
                      label="Email"
                      type="email"
                      placeholder="jenn@gmail.com"
                      fullWidth
                      size="small"
                      //   id="filled-hidden-label-small"
                      {...register("email", {
                        required: "Campo requerido",
                        minLength: 5,
                      })}
                      error={!!errors.email}
                      helperText={errors.email ? "Campo requerido" : ""}
                    />
                  </Grid>

                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <TextField
                      label="Nombres"
                      type="text"
                      placeholder="Jennifer Intriago"
                      fullWidth
                      size="small"
                      //   id="filled-hidden-label-small"
                      {...register("displayName", {
                        required: "Campo requerido",
                        minLength: 5,
                      })}
                      error={!!errors.displayName}
                      helperText={errors.displayName ? "Campo requerido" : ""}
                    />
                  </Grid>

                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <TextField
                      label="Usuario"
                      type="text"
                      placeholder="jennIntriago"
                      fullWidth
                      size="small"
                      //   id="filled-hidden-label-small"
                      {...register("username", {
                        required: "Campo requerido",
                        minLength: 5,
                      })}
                      helperText={errors.username ? "Campo requerido" : ""}
                      error={!!errors.username}
                    />
                  </Grid>

                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <TextField
                      label="Tipo de Usuario"
                      select
                      defaultValue=""
                      fullWidth
                      size="small"
                      //   id="filled-hidden-label-small"
                      {...register("roleId", {
                        required: "Campo requerido",
                      })}
                      error={!!errors.roleId}
                      helperText={errors.roleId ? "Campo requerido" : ""}
                    >
                      {roles.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <TextField
                      label="Contraseña"
                      type="password"
                      placeholder="************"
                      fullWidth
                      size="small"
                      id="filled-hidden-label-small"
                      {...register("password", {
                        required: "Campo requerido",
                        minLength: 10,
                      })}
                      error={!!errors.password}
                      helperText={
                        errors.password
                          ? "La contraseña debe tener mínimo 10 caracteres"
                          : ""
                      }
                    />
                  </Grid>

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
        <TableUsers users={users} />
      </NoiseLayout>
    </>
  );
};
