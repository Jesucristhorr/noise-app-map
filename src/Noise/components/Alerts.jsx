import { Alert, AlertTitle, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

export const Alerts = ({ alert }) => {
  console.log(alert);

  const [open, setOpen] = useState(alert);

  const handleClose = () => setOpen(false);
  return (
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
          p: 0,
          width: { xs: "350px", md: "700px" },
          mt: 0,
        }}
      >
        <Alert
          severity="success"
          sx={{
            // mt: 2,
            width: "100%",
            p: 5,
            // display: isLoading ? "inherit" : "none",
            // display: "none",
          }}
        >
          <AlertTitle>Exito</AlertTitle>
          Sensor guardado correctamente
        </Alert>
      </Box>
    </Modal>
  );
};
