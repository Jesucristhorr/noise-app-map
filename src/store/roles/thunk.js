import { autenticacionPorEmailPassword } from "../../api/auth";
import { getToken } from "../../helpers/getToken";
import { getRole } from "./roleSlice";
export const getRoles = () => {
  return async (dispatch) => {
    let token = getToken();
    try {
      const resp = await autenticacionPorEmailPassword.get("/roles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //   return resp.data.roles;
      // console.log(resp.data.roles);
      dispatch(getRole(resp.data.roles));
    } catch (error) {
      console.log(error);
    }
  };
};
