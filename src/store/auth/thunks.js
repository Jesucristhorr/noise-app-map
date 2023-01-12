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
} from "./";
import { getToken } from "../../helpers/getToken";
import { useNavigate } from "react-router-dom";

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

      console.log(resp);
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
      console.log("Algo fallo");
      console.log(error);
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

export const startDeletingUser = () => {
  return async (dispatch, getState) => {
    const { id, user } = getState().auth;

    // TODO borrar sensor por usuario autenticado
    dispatch(deleteUserById(user.email));
  };
};
