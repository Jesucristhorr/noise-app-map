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
  setProtocols,
  setSensorTypes,
} from "./mapSlice";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { autenticacionPorEmailPassword } from "../../api/auth";
import { getToken } from "../../helpers/getToken";
import { loadSensors } from "../../helpers/getSensors";
import { getISOFormat } from "../../helpers/getISOFormat";
import { fetchProtocols } from "../../helpers/fetchProtocols";
import { fetchSensorTypes } from "../../helpers/fetchSensorTypes";

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
  type,
  description,
  measurementUnit,
  measurementKeyName,
  locationName,
  longitude,
  latitude,
  protocolId,
  connectionData,
}) => {
  return async (dispatch, getState) => {
    dispatch(savingNewSensor());
    const token = getToken();

    try {
      const resp = await autenticacionPorEmailPassword.post(
        "sensors",
        {
          name,
          type,
          description,
          measurementUnit,
          latitude,
          longitude,
          locationName,
          measurementKeyName,
          connectionData,
          protocolId,
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
          type,
          description,
          measurementUnit,
          measurementKeyName,
          locationName,
          longitude,
          latitude,
          protocolId,
          connectionData,
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

export const updateSensorForm = ({
  id,
  name,
  type,
  description,
  measurementUnit,
  measurementKeyName,
  locationName,
  longitude,
  latitude,
  protocolId,
  connectionData,
  sensorOriginalData,
}) => {
  return async (dispatch) => {
    const token = getToken();

    try {
      const resp = await autenticacionPorEmailPassword.put(
        "sensors",
        {
          sensorId: id,
          name,
          type,
          description,
          measurementUnit,
          latitude,
          longitude,
          locationName,
          measurementKeyName,
          connectionData,
          protocolId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(
        updateSensor({
          id,
          name,
          type,
          description,
          measurementUnit,
          measurementKeyName,
          locationName,
          longitude,
          latitude,
          protocolId,
          connectionData,
          sensorOriginalData,
        })
      );
    } catch (error) {
      console.log("Algo salió mal :(");
      console.log(error);
      dispatch(errorSensor(error));
    }
  };
};

export const startDeletingSensor = () => {
  return async (dispatch, getState) => {
    const { sensor } = getState().map;
    const token = getToken();

    try {
      const resp = await autenticacionPorEmailPassword.delete(
        `sensors/${sensor.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(deleteSensorById(sensor.id));
    } catch (error) {
      console.log("Algo salió mal :(");
      console.log(error);
      dispatch(errorSensor(error));
    }
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

export const setSensorStatusState = (sensorStatusArray) => {
  return async (dispatch, getState) => {
    const { sensors } = getState().map;
    const newSensors = sensors.map((sensor) => {
      const sensorFound = sensorStatusArray.find(
        (sen) => sen.sensorId === sensor.id
      );

      if (sensorFound)
        return {
          ...sensor,
          connectionStatus: sensorFound.connectionStatus,
          connectionErrorMsg: sensorFound.connectionErrorMsg ?? undefined,
        };

      return {
        ...sensor,
      };
    });
    dispatch(setSensors(newSensors));
  };
};

export const startLoadingProtocols = () => {
  return async (dispatch) => {
    try {
      const protocols = await fetchProtocols();

      dispatch(setProtocols(protocols));
    } catch (error) {
      console.error("Error getting protocols:", error);
    }
  };
};

export const startLoadingSensorTypes = () => {
  return async (dispatch) => {
    try {
      const sensorTypes = await fetchSensorTypes();

      dispatch(setSensorTypes(sensorTypes));
    } catch (error) {
      console.error("Error getting sensor types:", error);
    }
  };
};
