import { useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserLocation, setMap } from "../../store/map/thunks";
import { Loading } from "./Loading";
import { Map, Marker, Popup } from "mapbox-gl";
import { setMapa } from "../../store/map/mapSlice";

export const MapView = () => {
  const { isLoading, userLocation, isMapReady, mapa, sensors } = useSelector(
    (state) => state.map
  );
  const dispatch = useDispatch();

  const mapDiv = useRef(null);

  useLayoutEffect(() => {
    if (!isLoading) {
      const map = new Map({
        container: mapDiv.current, // container ID
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        center: userLocation, // starting position [lng, lat]
        zoom: 15, // starting zoom
        projection: "globe", // display the map as a 3D globe
      });

      // dispatch(setMap(map));

      const myLocationPopup = new Popup().setHTML(`
        <h4>Aqui Estoy</h4>
        <p>En algun punto de Manta</p>
    `);

      map.on("style.load", () => {
        map.setFog({}); // Set the default atmosphere style
      });

      const newMarkets = [];
      sensors.forEach((sensor) => {
        console.log(sensor);
        const { longitude, latitude } = sensor;
        const market = [longitude, latitude];
        const myLocationPopup = new Popup().setHTML(`
        <h4>Nueva Ubicación</h4>
        <p>En algun punto de manta</p>
        <p>Sensor: ${sensor.nombre}</p>
        <p>Descripcion: ${sensor.description}</p>
        <img style='width: 150px' src=${"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3024&q=80"} />

    `);
        const newMarket = new Marker({
          color: "#000",
        })
          .setLngLat(market)
          .setPopup(myLocationPopup)
          .addTo(map);
        // newMarkets.push(newMarket);
        // console.log(newMarkets);
      });
      //
      //
      //Centro
      new Marker({
        color: "#000",
      })
        .setLngLat(userLocation)
        .setPopup(myLocationPopup)
        .addTo(map);
    }
  }, [isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div
        ref={mapDiv}
        style={{
          height: "100vh",
          width: "100%",
          position: "fixed",
          top: "0",
          left: "0",
        }}
      >
        {/* {userLocation?.join(",")} */}
      </div>
    </>
  );
};
