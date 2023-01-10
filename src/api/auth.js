import axios from "axios";

export const autenticacionPorEmailPassword = axios.create({
  baseURL: "https://iot-api.codefilia.com/v1/",
});
