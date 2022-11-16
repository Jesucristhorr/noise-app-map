import { useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserLocation } from "../../store/map/thunks";
import { Loading } from "./Loading";
import { Map, Marker, Popup } from "mapbox-gl";

export const MapView = () => {
  const { isLoading, userLocation } = useSelector((state) => state.map);
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

      const myLocationPopup = new Popup().setHTML(`
        <h4>Aqui Estoy</h4>
        <p>En algun punto de Manta</p>
    `);

      map.on("style.load", () => {
        map.setFog({}); // Set the default atmosphere style
      });

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
