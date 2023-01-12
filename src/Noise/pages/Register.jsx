import React, { useEffect, useState } from "react";
import { NoiseLayout } from "../layout/NoiseLayout";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
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
import { startCreatingUserWithEmailPassword } from "../../store/auth";
import { CloseOutlined } from "@mui/icons-material";
import { TableUsers } from "../components/TableUsers";
import { getRoles } from "../../store/roles/thunk";

// const role = [
//   {
//     value: 1,
//     label: "System",
//   },
//   {
//     value: 2,
//     label: "Admin",
//   },
//   {
//     value: 3,
//     label: "Common",
//   },
// ];

export const Register = () => {
  const { messageSaved, isSaving, users } = useSelector((state) => state.auth);
  const { roles } = useSelector((state) => state.role);

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openAlert, setOpenAlert] = useState(isSaving);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(getRoles());
  }, []);

  return (
    <>
      <NoiseLayout>
        <Button variant="contained" onClick={handleOpen} sx={{ color: "#fff" }}>
          Agregar Nuevo Usuario
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
            }}
          >
            <AlertTitle>Guardado</AlertTitle>
            {messageSaved}
          </Alert>
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
                  console.log(data);
                  dispatch(startCreatingUserWithEmailPassword(data));
                  reset();
                  setOpen(false);
                  setOpenAlert(true);
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
                      helperText={errors.roleId ? "Campo requerido" : ""}
                      error={!!errors.roleId}
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
                        minLength: 5,
                      })}
                      error={!!errors.password}
                      helperText={errors.password ? "Campo requerido" : ""}
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
