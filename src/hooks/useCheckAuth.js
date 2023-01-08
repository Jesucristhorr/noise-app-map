import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/auth";

export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    // La finalidad de este useEffect es mantener la sesion si el user esta autenticado

    // esto es para ver si existe un usuario (firebase)
    // if (!user) return dispatch(logout());

    // Mientra se pone estatico para tener un use Auth
    const user = {
      uid: "123",
      email: "jennifergabriela52@gmail.com",
      displayName: "Jennifer Intriago",
      photoUrl: "",
    };

    dispatch(login(user));
  }, []);

  return {
    status,
  };
};
