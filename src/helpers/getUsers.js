import { autenticacionPorEmailPassword } from "../api/auth";
import { getToken } from "./getToken";

export const loadUsers = async () => {
  let token = getToken();

  try {
    const resp = await autenticacionPorEmailPassword.get("/users?pageSize=10", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log(resp.data.users);

    const users = [];
    resp.data.users.forEach((user) => {
      users.push(user);
    });
    return users;
  } catch (error) {
    console.log(error);
    console.log("algo salió mal");
  }
};
