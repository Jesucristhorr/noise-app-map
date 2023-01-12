import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/auth";
import { getToken } from "../helpers/getToken";
import { getUser } from "../helpers/getUser";

export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    // La finalidad de este useEffect es mantener la sesion si el user esta autenticado
    let mitoken = getToken();
    if (mitoken) {
      let { id, email, displayName, username, role } = JSON.parse(getUser());
      dispatch(login({ id, email, displayName, username, role }));
    } else {
      dispatch(logout({ errorMessage: "" }));
    }
  }, []);

  return {
    status,
  };
};
