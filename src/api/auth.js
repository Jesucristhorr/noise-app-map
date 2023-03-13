import axios from "axios";

export const autenticacionPorEmailPassword = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
