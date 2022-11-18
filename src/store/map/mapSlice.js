import { createSlice } from "@reduxjs/toolkit";

export const mapSlice = createSlice({
  name: "map",
  initialState: {
    isLoading: true,
    userLocation: [],
    isMapReady: false,
    mapa: undefined,
  },
  reducers: {
    // type: setUserLocation  payload: [number, number]
    setUserLocation: (state, { payload }) => {
      // console.log(payload);
      (state.isLoading = false), (state.userLocation = payload);
    },

    setMapa: (state, { payload }) => {
      (state.isMapReady = true), (state.mapa = payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserLocation, setMapa } = mapSlice.actions;
