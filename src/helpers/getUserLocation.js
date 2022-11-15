export const getUserLocation = async () => {
  //resuelve algo de tipo [number, number]
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve([coords.longitude, coords.latitude]);
      },
      (err) => {
        alert("No se pudo obtener la geolocalización");
        console.log(err);
        reject();
      }
    );
  });
};
