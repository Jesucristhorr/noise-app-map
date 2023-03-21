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
    messageUpdated: null,
    messageResendEmail: null,
    messageErrorResendEmail: null,
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
      state.messageSaved = "";
    },

    setUsers: (state, action) => {
      state.users = action.payload;
      state.messageErrorResendEmail = null;
      // state.messageSaved = null;
    },

    deleteUserById: (state, action) => {
      state.user = null;
      state.users = state.users.filter((user) => user.email !== action.payload);
      state.messageDelete = `Usuario con email "${action.payload}" eliminado correctamente`;
    },

    showErrorRegister: (state, { payload }) => {
      console.log(payload);
      state.errorMessage = payload;
      state.messageSaved = null;
    },

    showMsgResendEmail: (state, { payload }) => {
      console.log(payload);
      state.messageResendEmail = payload.msg;
      state.messageErrorResendEmail = null;
    },

    showMsgErrorResendEmail: (state, { payload }) => {
      state.messageErrorResendEmail = payload.msg;
      state.messageResendEmail = null;
    },

    updateUser: (state, action) => {
      state.isSaving = false;
      state.users = state.users.map((user) => {
        if (user.id === action.payload.id) {
          return {
            ...user,
            ...action.payload,
          };
        }
        return user;
      });
      state.messageUpdated = `Usuario "${action.payload.displayName}" actualizado satisfactoriamente`;
    },

    clearMessages: (state, action) => {
      state.messageSaved = null;
      state.messageUpdated = null;
      state.messageResendEmail = null;
      state.messageErrorResendEmail = null;
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
  showMsgResendEmail,
  showMsgErrorResendEmail,
  updateUser,
  clearMessages,
} = authSlice.actions;
