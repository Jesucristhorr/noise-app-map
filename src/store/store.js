// Fuente unica de la verdad
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { mapSlice } from "./map/mapSlice";
import { roleSlice } from "./roles/roleSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    map: mapSlice.reducer,
    role: roleSlice.reducer,
  },
});
