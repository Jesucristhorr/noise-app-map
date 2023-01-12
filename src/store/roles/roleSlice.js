import { createSlice } from "@reduxjs/toolkit";

export const roleSlice = createSlice({
  name: "role",
  initialState: {
    roles: [],
  },
  reducers: {
    getRole: (state, { payload }) => {
      //   console.log(payload);
      state.roles = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getRole } = roleSlice.actions;
