import { DeleteOutline, Edit } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Modals } from "./Modals";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveSensorForm,
  startDeletingSensor,
} from "../../store/map/thunks";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

export const TableSensors = ({ sensors }) => {
  const [open, setOpen] = useState(false);

  const { sensor } = useSelector((state) => state.map);
  const dispatch = useDispatch();

  const handleModalEdit = () => {
    console.log("le dieron clic");
    setOpen(true);
  };
  return (
    <TableContainer
      component={Paper}
      sx={{ mt: "24px", width: { md: "100%", xs: "340px" } }}
    >
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Sensor</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Descripcion</TableCell>
            <TableCell>Unidad de Medida</TableCell>
            <TableCell>Lugar</TableCell>
            <TableCell>Latitud</TableCell>
            <TableCell>Longitud</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        {/* Body */}
        <TableBody>
          {sensors.map((sensor) => (
            <TableRow key={sensor.id}>
              <TableCell>{sensor.id}</TableCell>
              <TableCell>{sensor.sensor}</TableCell>
              <TableCell>{sensor.nombre}</TableCell>
              <TableCell>{sensor.description}</TableCell>
              <TableCell>{sensor.unit}</TableCell>
              <TableCell>{sensor.place}</TableCell>
              <TableCell>{sensor.latitude}</TableCell>
              <TableCell>{sensor.longitude}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => {
                    setOpen(true);
                    dispatch(setActiveSensorForm(sensor));
                  }}
                >
                  <Edit sx={{ color: "#f9ca24" }} />
                </IconButton>
                <IconButton
                  onClick={() => {
                    dispatch(setActiveSensorForm(sensor));
                    Swal.fire({
                      title: "Esta seguro de eliminar este Nodo?",
                      text: "Esta acción no se puede revertir",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Yes, delete it!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        dispatch(startDeletingSensor());
                        Swal.fire(
                          "Borrado!",
                          "Este Nodo ha sido eliminado",
                          "success"
                        );
                      }
                    });
                  }}
                >
                  <DeleteOutline sx={{ color: "#c23616" }} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modals open={open} setOpen={setOpen} sensor={sensor} />
    </TableContainer>
  );
};
