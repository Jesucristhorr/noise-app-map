import {
  setUserLocation,
  setMapa,
  savingNewSensor,
  addNewSensor,
  setActiveSensor,
  updateSensor,
  deleteSensorById,
} from "./mapSlice";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

export const getUserLocation = () => {
  return async (dispatch) => {
    try {
      await navigator.geolocation.getCurrentPosition(({ coords }) => {
        dispatch(setUserLocation([coords.longitude, coords.latitude]));
      });
    } catch (error) {
      alert("No se pudo obtener la geolocalización");
      console.log(error);
    }
  };
};

export const setMap = (map) => {
  return async (dispatch) => {
    try {
      const algo = await map;
      console.log(algo);

      dispatch(setMapa(algo));
    } catch (error) {
      alert("Ocurrio algo inesperado");
      console.log(error);
    }
  };
};

export const startNewNote = (data) => {
  return async (dispatch, getState) => {
    dispatch(savingNewSensor());
    data.id = new Date().getTime();
    // console.log(data);
    dispatch(addNewSensor(data));
  };
};

export const setActiveSensorForm = (data) => {
  return async (dispatch) => {
    dispatch(setActiveSensor(data));
  };
};

export const updateSensorForm = (sensor) => {
  return async (dispatch) => {
    dispatch(updateSensor(sensor));
  };
};

export const startDeletingSensor = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { sensor } = getState().map;
    // todo borrar sensor por usuario autenticado

    dispatch(deleteSensorById(sensor.id));
  };
};
