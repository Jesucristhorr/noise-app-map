import {
  Box,
  Button,
  Grid,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUserById } from "../../store/auth";

export const RegisterEdit = ({ open, setOpen, user }) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { roles } = useSelector((state) => state.role);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  // setear valores
  useEffect(() => {
    if (!!user) {
      setValue("email", user.email ? user.email : "");
      setValue("displayName", user.displayName ? user.displayName : "");
      setValue("username", user.username ? user.username : "");
      setValue("roleId", "name", user.role ? user.role.id : "");
    }
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
          Ingresar Nuevo usuario
        </Typography>
        <form
          onSubmit={handleSubmit((data) => {
            const { id } = user;
            const newUser = { id, ...data };
            // console.log(newUser);
            dispatch(updateUserById(newUser));
            // dispatch(startCreatingUserWithEmailPassword(data)).then(() => {
            //   setOpenAlert(true);
            //   setLoading(false);
            //   dispatch(startLoadingUsers());
            // });

            // setLoading(true);
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
