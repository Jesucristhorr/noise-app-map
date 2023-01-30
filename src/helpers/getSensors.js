import { autenticacionPorEmailPassword } from "../api/auth";
import { getToken } from "./getToken";

export const loadSensors = async () => {
  let token = getToken();

  try {
    const resp = await autenticacionPorEmailPassword.get("/sensors", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log(resp.data.sensors);

    const sensors = [];
    resp.data.sensors.forEach((sensor) => {
      sensors.push(sensor);
    });
    return sensors;
  } catch (error) {
    console.log(error);
    console.log("algo salió mal");
  }
};
