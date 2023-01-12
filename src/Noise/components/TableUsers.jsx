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
import { startDeletingUser } from "../../store/auth";

export const TableUsers = ({ users }) => {
  const [open, setOpen] = useState(false);

  const { sensor } = useSelector((state) => state.map);
  const { roles } = useSelector((state) => state.role);

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
            <TableCell>Email</TableCell>
            <TableCell>Nombres</TableCell>
            <TableCell>Usuario</TableCell>
            <TableCell>Rol</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        {/* Body */}
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.email}>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.displayName}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>
                {user.roleId === 1
                  ? roles[0].name
                  : user.roleId === 2
                  ? roles[1].name
                  : user.roleId === 3
                  ? roles[2].name
                  : ""}
              </TableCell>

              <TableCell>
                {/* EDITAR USER */}
                {/* <IconButton
                  onClick={() => {
                    
                  }}
                >
                  <Edit sx={{ color: "#f9ca24" }} />
                </IconButton> */}
                <IconButton
                  onClick={() => {
                    // dispatch(setActiveSensorForm(sensor));
                    Swal.fire({
                      title: "Esta seguro de eliminar este Usuario?",
                      text: "Esta acción no se puede revertir",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#15AABF",
                      cancelButtonColor: "#fc5c65",
                      confirmButtonText: "Sí, eliminar!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        dispatch(startDeletingUser());
                        Swal.fire(
                          "Borrado!",
                          "Este Usuario ha sido eliminado",
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
