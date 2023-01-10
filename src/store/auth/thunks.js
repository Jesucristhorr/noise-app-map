import axios from "axios";
import { autenticacionPorEmailPassword } from "../../api/auth";
import {
  checkingCredentials,
  login,
  logout,
  addNewUser,
  savingNewUser,
} from "./";

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
  role,
  password,
}) => {
  return async (dispatch) => {
    // Enviar al backend informacion del usuario - tarea asincrona
    dispatch(savingNewUser());

    // TODO: enviar la informacion del usuario y recibir la res del back.
    dispatch(addNewUser({ email, displayName, username, role, password }));
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
    } catch (error) {
      console.log(error);
      setError(error.resp);

      dispatch(logout());
    }
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    // manadamos a llamar el logout desde el backend
    dispatch(logout({ errorMessage: null }));
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
