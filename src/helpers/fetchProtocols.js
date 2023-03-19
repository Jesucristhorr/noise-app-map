import { autenticacionPorEmailPassword } from "../api/auth";
import { getToken } from "./getToken";

export const fetchProtocols = async () => {
  let token = getToken();

  try {
    const resp = await autenticacionPorEmailPassword.get("/protocols", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return resp.data.protocols;
  } catch (error) {
    console.error("Something went wrong fetching protocols:", error);
  }
};
