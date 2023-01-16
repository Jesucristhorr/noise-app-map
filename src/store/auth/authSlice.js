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
    users: [],
    user: null,
    isSaving: false,
    errorMessage: null,
    messageSaved: null,
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
      state.errorMessage = payload?.errorMessage;
    },

    // Control de botones y loading de la app
    checkingCredentials: (state, payload) => {
      state.status = "checking";
    },

    savingNewUser: (state) => {
      state.isSaving = true;
    },
    addNewUser: (state, action) => {
      //mutar el obj
      // console.log(action.payload);
      state.users.push(action.payload);

      state.messageSaved = `Usuario ${action.payload.displayName} agregado correctamente`;
      state.errorMessage = null;
    },

    // usuario individual
    setActiveUser: (state, { payload }) => {
      state.user = payload;
      state.messageSaved = "";
    },

    setUsers: (state, action) => {
      state.users = action.payload;
    },

    deleteUserById: (state, action) => {
      state.user = null;
      state.users = state.users.filter((user) => user.email !== action.payload);
      state.messageDelete = `Usuario con email ${action.payload} borrado correctamente`;
    },

    showErrorRegister: (state, { payload }) => {
      console.log(payload);
      state.errorMessage = payload;
      state.messageSaved = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  login,
  logout,
  checkingCredentials,
  addNewUser,
  savingNewUser,
  deleteUserById,
  setActiveUser,
  showErrorRegister,
  setUsers,
} = authSlice.actions;
