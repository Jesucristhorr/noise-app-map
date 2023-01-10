import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "checking",
    id: null,
    email: null,
    displayName: null,
    username: null,
    role: null,
    errorMessage: null,
  },
  reducers: {
    login: (state, { payload }) => {
      (state.status = "authenticated"), (state.id = payload.id);
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.username = payload.username;
      state.role = payload.role;
      state.errorMessage = null;
    },

    logout: (state, { payload }) => {
      (state.status = "not-authenticated"), (state.id = null);
      state.email = null;
      state.displayName = null;
      state.username = null;
      state.role = null;
      state.errorMessage = payload.errorMessage;
    },

    // Control de botones y loading de la app
    checkingCredentials: (state, payload) => {
      state.status = "checking";
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;
