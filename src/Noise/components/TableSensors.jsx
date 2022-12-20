import { DeleteOutline, Edit } from "@mui/icons-material";
import {
  IconButton,
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
import { setActiveSensorForm } from "../../store/map/thunks";

export const TableSensors = ({ sensors }) => {
  const [open, setOpen] = useState(false);

  const { sensor } = useSelector((state) => state.map);
  const dispatch = useDispatch();

  const handleModalEdit = () => {
    console.log("le dieron clic");
    setOpen(true);
  };
  return (
    <div>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Sensor</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripcion</TableCell>
              <TableCell>Unidad de Medida</TableCell>
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
                <TableCell>{sensor.latitude}</TableCell>
                <TableCell>{sensor.longitude}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      console.log(`Agarre el sensor con ID: ${sensor.id}`);
                      setOpen(true);
                      dispatch(setActiveSensorForm(sensor));
                    }}
                  >
                    <Edit sx={{ color: "#f9ca24" }} />
                  </IconButton>
                  <IconButton>
                    <DeleteOutline sx={{ color: "#c23616" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modals open={open} setOpen={setOpen} sensor={sensor} />
    </div>
  );
};
