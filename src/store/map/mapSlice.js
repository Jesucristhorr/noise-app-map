import { createSlice } from "@reduxjs/toolkit";

export const mapSlice = createSlice({
  name: "map",
  initialState: {
    isLoading: true,
    userLocation: [],
    isMapReady: false,
    mapa: undefined,
    sensors: [],
    sensor: null,
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

    // sensor individual
    setActiveSensor: (state, { payload }) => {
      state.sensor = payload;
    },

    updateSensor: (state, action) => {
      state.sensors = state.sensors.map((sensor) => {
        if (sensor.id === action.payload.id) {
          return action.payload;
        }
        return sensor;
      });
      state.messageSaved = `${action.payload.nombre}, actualizada correctamente`;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUserLocation,
  setMapa,
  savingNewSensor,
  addNewSensor,
  setActiveSensor,
  updateSensor,
} = mapSlice.actions;
