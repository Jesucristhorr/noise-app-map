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
    const result = {
      email: "jennifergabriela52@gmail.com",
      password: "12345678910",
      displayName: "Jennifer Intriago",
    };

    // Validacion en caso de que la peticion al backend no se realizo correctamente
    // if (!result.ok) return dispatch(logout(result));
    dispatch(login(result));
  };
};
