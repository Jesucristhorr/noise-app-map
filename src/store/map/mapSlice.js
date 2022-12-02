import { createSlice } from "@reduxjs/toolkit";

export const mapSlice = createSlice({
  name: "map",
  initialState: {
    isLoading: true,
    userLocation: [],
    isMapReady: false,
    mapa: undefined,
    sensors: [],
    isSaving: false,
    messageSaved: "",
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

    savingNewSensor: (state) => {
      state.isSaving = true;
    },

    addNewSensor: (state, action) => {
      //mutar el obj
      state.sensors.push(action.payload);
      state.isSaving = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserLocation, setMapa, savingNewSensor, addNewSensor } =
  mapSlice.actions;
