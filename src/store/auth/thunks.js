import axios from "axios";
import { autenticacionPorEmailPassword } from "../../api/auth";
import {
  checkingCredentials,
  login,
  logout,
  addNewUser,
  savingNewUser,
  setActiveUser,
  deleteUserById,
  showErrorRegister,
  setUsers,
  showMsgResendEmail,
  showMsgErrorResendEmail,
  updateUser,
  clearMessages,
} from "./";
import { getToken } from "../../helpers/getToken";
import { useNavigate } from "react-router-dom";
import { loadUsers } from "../../helpers/getUsers";

// Ejecuta acciones o tareas asincronas
export const checkingAuthentication = (emai, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    //   const result = await signInWithGoogle();
    //   if (!result.ok) return dispatch(logout(result.errorMessage));
    //   dispatch(login(result));
  };
};

export const startCreatingUserWithEmailPassword = ({
  email,
  displayName,
  username,
  roleId,
  password,
}) => {
  return async (dispatch) => {
    // Enviar al backend informacion del usuario - tarea asincrona

    try {
      let token = getToken();
      const resp = await autenticacionPorEmailPassword.post(
        "/auth/signup",
        {
          email,
          displayName,
          username,
          roleId,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log(resp);
      dispatch(
        addNewUser({
          email,
          displayName,
          username,
          roleId,
          password,
        })
      );
      dispatch(savingNewUser());
    } catch (error) {
      console.log("Algo falló");
      console.log(error.response.data);
      dispatch(showErrorRegister(error.response.data.msg));
    }
  };
};

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    try {
      const resp = await autenticacionPorEmailPassword.post("auth/login", {
        email,
        password,
      });
      console.log(resp.data.user);
      dispatch(login(resp.data.user));
      localStorage.setItem("token", resp.data.token);
      localStorage.setItem("user", JSON.stringify(resp.data.user));
    } catch (error) {
      console.log(error.response.data.msg);
      // setError(error.resp);
      dispatch(logout({ errorMessage: error.response.data.msg }));
    }
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    // borrar data en LocalStorage
    dispatch(logout({ errorMessage: "" }));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
};

export const setActiveUserForm = (data) => {
  return async (dispatch) => {
    dispatch(setActiveUser(data));
  };
};

export const startLoadingUsers = () => {
  return async (dispatch, getState) => {
    try {
      const users = await loadUsers();
      // console.log(users);
      dispatch(setUsers(users));
    } catch (error) {
      console.log(error);
      console.log("Algo salio mal");
    }
  };
};

export const startDeletingUser = () => {
  return async (dispatch, getState) => {
    const { user } = getState().auth;

    try {
      const token = getToken();
      const resp = await autenticacionPorEmailPassword.delete(
        `/users/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await dispatch(deleteUserById(user.email));
    } catch (error) {
      console.error("Something went wrong when deleting user", error);
      throw error;
    }

    // TODO borrar sensor por usuario autenticado
  };
};

export const resendEmailConfirmation = ({ id }) => {
  return async (dispatch, getState) => {
    let token = getToken();
    try {
      const resp = await autenticacionPorEmailPassword.post(
        "/auth/signup/resend-confirmation-email",
        { userId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(showMsgResendEmail(resp.data));
    } catch (error) {
      // console.log(error.response.data);
      console.log("Algo salió mal :(");
      dispatch(showMsgErrorResendEmail(error.response.data));
    }
  };
};

export const updateUserById = ({
  id,
  displayName,
  roleId,
  previousPassword,
  password,
}) => {
  return async (dispatch, getState) => {
    // TODO despachar reducer para actualizar usuario
    try {
      const token = getToken();
      const resp = await autenticacionPorEmailPassword.put(
        "users",
        {
          userId: id,
          displayName,
          roleId,
          previousPassword,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(
        updateUser({
          id,
          displayName,
          roleId,
          previousPassword,
          password,
        })
      );
    } catch (error) {
      console.error("Error updating user by id", error);
      throw error;
    }
  };
};
