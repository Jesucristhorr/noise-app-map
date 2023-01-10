import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/auth";

export const useCheckAuth = () => {
  const { status, id, email, displayName, username, role } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // La finalidad de este useEffect es mantener la sesion si el user esta autenticado

    if (status === "authenticated") {
      dispatch(login({ id, email, displayName, username, role }));
    } else {
      dispatch(logout({ errorMessage: "" }));
    }
  }, []);

  return {
    status,
  };
};
