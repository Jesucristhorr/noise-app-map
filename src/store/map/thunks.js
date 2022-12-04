import {
  setUserLocation,
  setMapa,
  savingNewSensor,
  addNewSensor,
} from "./mapSlice";

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
    console.log(data);
    dispatch(addNewSensor(data));
  };
};
