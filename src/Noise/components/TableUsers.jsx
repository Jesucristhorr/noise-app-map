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
  Typography,
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
  clearMessages,
} from "../../store/auth";
import { RegisterEdit } from "./RegisterEdit";

export const TableUsers = ({ users, loadingUsers, setOpenLoadingUsers }) => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { sensor } = useSelector((state) => state.map);
  const { roles } = useSelector((state) => state.role);
  const { user, id: currentUserId } = useSelector((state) => state.auth);

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
    <>
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
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          {/* Body */}
          <TableBody>
            {(rowsPerPage > 0
              ? users.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : users
            ).map((user) => (
              <TableRow key={user.email}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.displayName}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.role ? user.role.name : "NO ROLE"}</TableCell>
                <TableCell>
                  {user.active ? (
                    <Typography sx={{ color: "#78e08f", fontWeight: "bold" }}>
                      Activo
                    </Typography>
                  ) : (
                    <Typography sx={{ color: "#ff6b6b", fontWeight: "bold" }}>
                      Inactivo
                    </Typography>
                  )}
                </TableCell>

                <TableCell>
                  {/* send mail */}
                  <Tooltip title="Reenviar email de verificación">
                    <span>
                      <IconButton
                        onClick={() => {
                          dispatch(resendEmailConfirmation(user)).then(
                            () => {}
                          );
                        }}
                        disabled={user.active}
                      >
                        <MarkEmailUnread
                          color={user.active ? "disabled" : "primary"}
                        />
                      </IconButton>
                    </span>
                  </Tooltip>

                  {/* edit */}
                  <Tooltip title="Editar usuario">
                    <span>
                      <IconButton
                        disabled={loadingUsers}
                        onClick={() => {
                          setOpen(true);
                          dispatch(setActiveUserForm(user));

                          // TODO: Depachar thunk de editar
                          // dispatch(updateUserById(user))
                        }}
                      >
                        <Edit
                          sx={loadingUsers ? {} : { color: "#f9ca24" }}
                          color={loadingUsers ? "disabled" : undefined}
                        />
                      </IconButton>
                    </span>
                  </Tooltip>
                  <Tooltip title="Eliminar usuario">
                    <span>
                      <IconButton
                        disabled={
                          currentUserId === user.id ||
                          user.username === "system" ||
                          loadingUsers
                        }
                        onClick={() => {
                          dispatch(setActiveUserForm(user)).then(() => {
                            Swal.fire({
                              title:
                                "¿Está seguro de que desea eliminar este usuario?",
                              text: "Esta acción es irreversible",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#15AABF",
                              cancelButtonColor: "#fc5c65",
                              confirmButtonText: "Sí, eliminar",
                              cancelButtonText: "No, cancelar",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                setOpenLoadingUsers(true);
                                dispatch(startDeletingUser())
                                  .then(() => {
                                    Swal.fire(
                                      "Usuario eliminado",
                                      "El usuario ha sido eliminado satisfactoriamente",
                                      "success"
                                    );
                                  })
                                  .finally(() => {
                                    setOpenLoadingUsers(false);
                                  });
                              }
                            });
                          });
                        }}
                      >
                        <DeleteOutline
                          sx={
                            currentUserId === user.id ||
                            user.username === "system" ||
                            loadingUsers
                              ? {}
                              : { color: "#c23616" }
                          }
                          color={
                            currentUserId === user.id ||
                            user.username === "system" ||
                            loadingUsers
                              ? "disabled"
                              : undefined
                          }
                        />
                      </IconButton>
                    </span>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <RegisterEdit
          open={open}
          setOpen={setOpen}
          user={user}
          setOpenLoadingUsers={setOpenLoadingUsers}
        />

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
    </>
  );
};
