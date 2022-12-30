import { useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserLocation, setMap } from "../../store/map/thunks";
import { Loading } from "./Loading";
import { Map, Marker, Popup } from "mapbox-gl";
import { setMapa } from "../../store/map/mapSlice";
import { Typography } from "@mui/material";
import { AddLocationAltOutlined } from "@mui/icons-material";
import { PopupMap } from "./PopupMap";

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
        <h4>Ubicación Actual</h4>
        
    `);

      map.on("style.load", () => {
        map.setFog({}); // Set the default atmosphere style
      });

      const newMarkets = [];
      sensors.forEach((sensor) => {
        console.log(sensor);
        const { longitude, latitude } = sensor;
        const market = [longitude, latitude];
        const myLocationPopup = new Popup().setHTML(
          `
        <div style='background-color: #15AABF; padding: 5px; color: #fff '>
          <h3>Sensor ${sensor.sensor}</h3>
        </div>
        <p><strong>Sensor</strong>: ${sensor.nombre}</p>
        <p><strong>Descripcion:</strong> ${sensor.description}</p>
        <p><strong>Lugar:</strong> Sensor ubicado en ${userLocation}</p>

        <div style='display: flex; justify-content: center;'>
        <div style='width: 100px; height: 100px; background-color: #a29bfe; border-radius: 50%; display: flex; align-items: center;'>
        <div style='padding: 10px'>
          <p style='text-align: center;'><strong>dB:</strong> 75dB (umbral de dolor)</p>
        </div>
        </div>
        </div>
        
       
        <div style='display: flex; justify-content: center;  margin-top: 10px;'>
          <img style='width: 80px'; object-fit: cover; margin: 0 auto:' src=${"https://cdn-icons-png.flaticon.com/512/853/853483.png?w=740&t=st=1671568416~exp=1671569016~hmac=dc7cb683e4ce77f84b41e4284fafb7cf96b71222c160dc89fad5e4e9f215990c"} />
        </div>

        `
        );
        const newMarket = new Marker({
          color: "#29AFC3",
          // draggable: true,
          // element: "<AddLocationAltOutlined />",
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
        color: "#29AFC3",
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
