import { setUserLocation, setMapa } from "./mapSlice";

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
