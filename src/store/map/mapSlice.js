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
    messageUpdated: "",
    messageDelete: "",
    messageError: "",
  },
  reducers: {
    // type: setUserLocation  payload: [number, number]
    setUserLocation: (state, { payload }) => {
      // console.log(payload);
      (state.isLoading = false),
        (state.userLocation = payload),
        (state.messageDelete = ""),
        (state.messageSaved = "");
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
      state.messageSaved = `Sensor ${action.payload.name} agregado correctamente`;
    },

    // sensor individual
    setActiveSensor: (state, { payload }) => {
      state.sensor = payload;
      // state.messageSaved = "";
    },

    updateSensor: (state, action) => {
      state.sensors = state.sensors.map((sensor) => {
        if (sensor.id === action.payload.id) {
          return action.payload;
        }
        return sensor;
      });
      state.messageUpdated = `Sensor ${action.payload.sensor}, actualizado correctamente`;
    },

    // Eliminar sensor
    deleteSensorById: (state, action) => {
      state.sensor = null;
      state.sensors = state.sensors.filter(
        (sensor) => sensor.id !== action.payload
      );
      state.messageDelete = `Sensor con ID ${action.payload} borrado correctamente`;
    },

    errorSensor: (state, action) => {
      console.log(action.payload.response.data.msg);
      state.messageError = `${action.payload.response.data.msg}`;
    },

    setSensors: (state, action) => {
      state.sensors = action.payload;
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
  deleteSensorById,
  errorSensor,
  setSensors,
} = mapSlice.actions;
