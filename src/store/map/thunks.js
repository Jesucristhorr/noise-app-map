import {
  setUserLocation,
  setMapa,
  savingNewSensor,
  addNewSensor,
  setActiveSensor,
  updateSensor,
  deleteSensorById,
  errorSensor,
  setSensors,
} from "./mapSlice";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { autenticacionPorEmailPassword } from "../../api/auth";
import { getToken } from "../../helpers/getToken";
import { loadSensors } from "../../helpers/getSensors";

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

export const startNewSensor = ({
  name,
  description,
  measurementUnit,
  locationName,
  longitude,
  latitude,
  connectionPassword,
  connectionUrl,
  connectionUsername,
  protocolId,
}) => {
  return async (dispatch, getState) => {
    dispatch(savingNewSensor());
    const token = getToken();

    try {
      const resp = await autenticacionPorEmailPassword.post(
        "sensors",
        {
          name,
          description,
          measurementUnit,
          latitude,
          longitude,
          locationName,
          connection: {
            protocolId,
            connectionUrl,
            connectionUsername,
            connectionPassword,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(
        addNewSensor({
          name,
          description,
          measurementUnit,
          locationName,
          longitude,
          latitude,
          connectionPassword,
          connectionUrl,
          connectionUsername,
          protocolId,
        })
      );
      console.log(resp.data.msg);
    } catch (error) {
      console.log("Algo salió mal :(");
      console.log(error);
      dispatch(errorSensor(error));
    }
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

export const startLoadingSensors = () => {
  return async (dispatch) => {
    try {
      const sensors = await loadSensors();
      // console.log(sensors);
      dispatch(setSensors(sensors));
    } catch (error) {
      console.log(error);
      console.log("Algo salio mal");
    }
  };
};
