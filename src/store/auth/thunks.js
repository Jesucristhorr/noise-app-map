import axios from "axios";
import { autenticacionPorEmailPassword } from "../../api/auth";
import { checkingCredentials, login, logout } from "./";

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
  password,
  displayName,
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    // Enviar al backend informacion del usuario - tarea asincrona
    const res = {
      name: "Jennifer Intriago Reyes",
      password: "123456789",
      displayName: "Jennifer Intriago",
    };

    console.log(res);

    // si recibe una respuesta positiva se creo el usuario sino, se hace esta valdiacion
    if (!ok) return dispatch(logout(errorMessage));

    // si todo sale bien despachamos la accion login para loguear al user
    dispatch(login({ res }));
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
