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
    messageDelete: "",
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
      state.messageSaved = `Sensor ${action.payload.sensor} agregado correctamente`;
    },

    // sensor individual
    setActiveSensor: (state, { payload }) => {
      state.sensor = payload;
      state.messageSaved = "";
    },

    updateSensor: (state, action) => {
      state.sensors = state.sensors.map((sensor) => {
        if (sensor.id === action.payload.id) {
          return action.payload;
        }
        return sensor;
      });
      state.messageSaved = `Sensor ${action.payload.sensor}, actualizado correctamente`;
    },

    // Eliminar sensor
    deleteSensorById: (state, action) => {
      state.sensor = null;
      state.sensors = state.sensors.filter(
        (sensor) => sensor.id !== action.payload
      );
      state.messageDelete = `Sensor con ID ${action.payload} borrado correctamente`;
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
} = mapSlice.actions;
