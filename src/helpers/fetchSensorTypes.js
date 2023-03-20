import { autenticacionPorEmailPassword } from "../api/auth";
import { getToken } from "./getToken";

export const fetchSensorTypes = async () => {
  let token = getToken();

  try {
    const resp = await autenticacionPorEmailPassword.get("/sensors/types", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return resp.data.sensorTypes;
  } catch (error) {
    console.error("Something went wrong fetching sensor types:", error);
  }
};
