import { Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { NoiseLayout } from "../layout/NoiseLayout";

export const ManageSensors = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    Width: 400,
    bgcolor: "#fff",
    border: "1px solid ##dfe6e9",
    borderRadius: "7px",
    boxShadow: 24,
    p: 4,
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
              <form>
                <Grid container>
                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <TextField
                      label="Sensor"
                      type="text"
                      placeholder="AWE34TC"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <TextField
                      label="Nombre"
                      type="text"
                      placeholder="Arduino Nano"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <TextField
                      label="Descripción"
                      type="text"
                      placeholder="Mide el ruido ambiental"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <TextField
                      label="Unidad de Medida"
                      type="number"
                      placeholder="dB(A)"
                      fullWidth
                    />
                  </Grid>

                  <Grid container justifyContent="space-between">
                    <Grid item xs={5.9} sx={{ mt: 2 }}>
                      <TextField
                        label="Longitud"
                        type="text"
                        placeholder="0987890"
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={5.9} sx={{ mt: 2 }}>
                      <TextField
                        label="Latitud"
                        type="text"
                        placeholder="0987890"
                        fullWidth
                      />
                    </Grid>
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
      </NoiseLayout>
    </>
  );
};
