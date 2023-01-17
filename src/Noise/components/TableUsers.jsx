import {
  DeleteOutline,
  Edit,
  MarkEmailReadOutlined,
  MarkEmailUnread,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";
import { ModalEditSensor } from "./ModalEditSensor";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveSensorForm,
  startDeletingSensor,
} from "../../store/map/thunks";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import {
  setActiveUserForm,
  startDeletingUser,
  startLoadingUsers,
  resendEmailConfirmation,
} from "../../store/auth";

export const TableUsers = ({ users }) => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { sensor } = useSelector((state) => state.map);
  const { roles } = useSelector((state) => state.role);

  const dispatch = useDispatch();

  const handleModalEdit = () => {
    console.log("le dieron clic");
    setOpen(true);
  };

  useEffect(() => {
    dispatch(startLoadingUsers());
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
          {(rowsPerPage > 0
            ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : users
          ).map((user) => (
            <TableRow key={user.email}>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.displayName}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.role ? user.role.name : "NO ROLE"}</TableCell>

              <TableCell>
                {/* send mail */}
                <Tooltip title="Reenviar Email de verificación">
                  <IconButton
                    onClick={() => {
                      // console.log("clic para reenviar mail");
                      // TODO: Depachar thunk de reenvio

                      dispatch(resendEmailConfirmation(user));
                    }}
                  >
                    <MarkEmailUnread color="primary" />
                  </IconButton>
                </Tooltip>

                {/* edit */}
                <IconButton
                  onClick={() => {
                    console.log("clic para editar");
                    // TODO: Depachar thunk de editar
                  }}
                >
                  <Edit sx={{ color: "#f9ca24" }} />
                </IconButton>
                <IconButton
                  onClick={() => {
                    dispatch(setActiveUserForm(user));
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
      <ModalEditSensor open={open} setOpen={setOpen} sensor={sensor} />

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onRowsPerPageChange={handleChangeRowsPerPage}
        onPageChange={handleChangePage}
      />
    </TableContainer>
  );
};
