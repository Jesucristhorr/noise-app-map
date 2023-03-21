import {
  Box,
  Button,
  Grid,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMessages,
  startLoadingUsers,
  updateUserById,
} from "../../store/auth";
import Swal from "sweetalert2";
import axios from "axios";

export const RegisterEdit = ({ open, setOpen, user, setOpenLoadingUsers }) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);

  const { roles } = useSelector((state) => state.role);
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
      email: user?.email,
      displayName: user?.displayName,
      username: user?.username,
      roleId: user?.role?.id ?? 1,
      previousPassword: "",
      password: "",
    },
  });
  // setear valores
  useEffect(() => {
    setValue("email", user?.email ? user.email : "");
    setValue("displayName", user?.displayName ? user.displayName : "");
    setValue("username", user?.username ? user.username : "");
    setValue("roleId", user?.role?.id ? user.role.id : 1);
    setValue("previousPassword", "");
    setValue("password", "");
  }, [user]);

  return (
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
          Actualizar nuevo usuario
        </Typography>
        <form
          onSubmit={handleSubmit((data) => {
            const { id } = user;
            const newUser = { id, ...data };
            // console.log(newUser);

            setOpenLoadingUsers(true);

            dispatch(updateUserById(newUser))
              .catch((error) => {
                if (axios.isAxiosError(error)) {
                  const message = error.response?.data?.msg;
                  const formattedMessage =
                    message === "Previous password is invalid"
                      ? "El usuario no se pudo actualizar porque la credencial proporcionada es inválida"
                      : message === "User does not exist"
                      ? "El usuario no se pudo actualizar porque no existe"
                      : "Ocurrió un error inesperado al intentar actualizar el usuario";

                  Swal.fire("Error", formattedMessage, "error");
                  return;
                }

                Swal.fire(
                  "Error",
                  "Ocurrió un error inesperado al intentar actualizar el usuario",
                  "error"
                );

                return;
              })
              .finally(() => {
                dispatch(startLoadingUsers()).finally(() => {
                  setOpenLoadingUsers(false);
                });
              });

            // dispatch(clearMessages());

            reset();
            setOpen(false);
          })}
        >
          <Grid container>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Email"
                type="email"
                disabled={true}
                placeholder="usuario@correo.com"
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
                disabled={true}
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
                defaultValue={user?.role?.id ?? 1}
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
                label="Contraseña anterior"
                type="password"
                placeholder="************"
                fullWidth
                size="small"
                id="filled-hidden-label-small"
                {...register("previousPassword", {
                  required: "Campo requerido",
                  minLength: 10,
                  maxLength: 32,
                })}
                error={!!errors.previousPassword}
                helperText={
                  errors.previousPassword
                    ? "La contraseña debe tener entre 10 y 32 caracteres"
                    : ""
                }
              />
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
                  maxLength: 32,
                })}
                error={!!errors.password}
                helperText={
                  errors.password
                    ? "La contraseña debe tener entre 10 y 32 caracteres"
                    : ""
                }
              />
            </Grid>

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
  );
};
