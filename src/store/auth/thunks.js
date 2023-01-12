import axios from "axios";
import { autenticacionPorEmailPassword } from "../../api/auth";
import {
  checkingCredentials,
  login,
  logout,
  addNewUser,
  savingNewUser,
} from "./";
import { getToken } from "../../helpers/getToken";

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
    dispatch(savingNewUser());
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
      dispatch(addNewUser({ email, displayName, username, roleId, password }));
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
      console.log(error);
      setError(error.resp);

      dispatch(logout());
    }
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    // borrar data en LocalStorage
    dispatch(logout({ errorMessage: null }));
    localStorage.removeItem("token");
    localStorage.removeItem("user ");
  };
};

export const startDeletingUser = () => {
  return async (dispatch, getState) => {
    const { id } = getState().auth;
    console.log(`Usuario que anda borrando ${id}`);

    // todo borrar sensor por usuario autenticado

    // dispatch(deleteUserById(sensor.id));
  };
};
