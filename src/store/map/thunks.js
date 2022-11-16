import { setUserLocation } from "./mapSlice";

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
