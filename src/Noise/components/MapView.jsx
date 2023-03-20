import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserLocation,
  setMap,
  startLoadingSensors,
} from "../../store/map/thunks";
import { Loading } from "./Loading";
import { Map, Marker, Popup } from "mapbox-gl";
import { setMapa } from "../../store/map/mapSlice";
import { Typography } from "@mui/material";
import { AddLocationAltOutlined } from "@mui/icons-material";
import { PopupMap } from "./PopupMap";
import { useCheckSocket } from "../../hooks/useCheckSocket";
import { DateTime } from "luxon";
import { checkNoiseLevel } from "../../helpers/checkNoiseLevel";
import { getLastSensorMetrics } from "../../store/metrics/thunks";

export const MapView = () => {
  const [mapInstance, setMapInstance] = useState();
  const [markersBySensor, setMarkersBySensor] = useState({});
  const { isLoading, userLocation, isMapReady, mapa, sensors } = useSelector(
    (state) => state.map
  );
  const { lastSensorMetrics } = useSelector((state) => state.metric);

  const dispatch = useDispatch();

  const mapDiv = useRef(null);

  useEffect(() => {
    dispatch(startLoadingSensors()).then(() => {
      dispatch(getLastSensorMetrics());
    });

    return () => {
      setMarkersBySensor(() => ({}));
    };
  }, []);

  const { lastSensorData } = useCheckSocket();

  useLayoutEffect(() => {
    if (!isLoading) {
      const map = new Map({
        container: mapDiv.current, // container ID
        style: "mapbox://styles/mapbox/light-v11", // style URL
        center: userLocation, // starting position [lng, lat]
        zoom: 15, // starting zoom
        projection: "globe", // display the map as a 3D globe
      });

      //   const myLocationPopup = new Popup().setHTML(`
      //     <h4>Ubicación Actual</h4>
      // `);

      map.on("style.load", () => {
        map.setFog({}); // Set the default atmosphere style
      });
      //
      //
      //Centro

      // new Marker({
      //   color: "#29AFC3",
      // })
      //   .setLngLat(userLocation)
      //   .setPopup(myLocationPopup)
      //   .addTo(map);

      setMapInstance(map);
    }
  }, [isLoading]);

  useLayoutEffect(() => {
    if (mapInstance) {
      console.log("Me ejecuté con last sensor metrics:", lastSensorMetrics);
      sensors.forEach((sensor) => {
        const { longitude, latitude } = sensor;
        const marker = [longitude, latitude];

        const sensorMetric = lastSensorData.filter(
          (data) => data.sensorId === sensor.id
        );

        const dbSensorMetric = lastSensorMetrics.filter(
          (data) => data.sensorId === sensor.id
        );

        const [{ value, createdAt } = {}] = dbSensorMetric || [];

        const [
          {
            measurement = value ? value : null,
            timestamp = createdAt
              ? DateTime.fromJSDate(new Date(createdAt)).toMillis()
              : null,
          } = {},
        ] = sensorMetric || [];

        const hasToShowNoiseWarnings = sensor.type === "NOISE";

        const { color, textColor, message, hasToShowWarning } = checkNoiseLevel(
          measurement ? Number(measurement) : null
        );

        const myLocationPopup = new Popup().setHTML(
          `
        <div style='background-color: #15AABF; padding: 5px; color: #fff '>
          <h3 style='text-align: center;'><span style='font-weight: 700;'>(ID: ${
            sensor.id
          })</span> Sensor "${sensor.name}"</h3>
          <p style='text-align: center;'>${
            timestamp
              ? `Última actualización ${DateTime.fromMillis(timestamp)
                  .setLocale("es-EC")
                  .toRelative()}`
              : "No se ha realizado medición"
          }</p>

        </div>
        <p><strong>Lugar:</strong> Sensor ubicado en ${sensor.locationName}</p>
        <p><strong>Estado:</strong> ${
          sensor.connectionStatus === "connected"
            ? `<span style='color: #78e08f; font-weight: bold;'>Conectado</span>`
            : sensor.connectionStatus === "pending"
            ? `<span style='color: #f9ca23; font-weight: bold;'>Pendiente</span>`
            : sensor.connectionStatus === "parse-issue"
            ? `<span style='color: #8fd301; font-weight: bold;'>Problema de parseo</span>`
            : `<span style='color: #c23616; font-weight: bold;'>Desconectado</span>`
        }</p>
        <p><strong>Tipo:</strong> ${sensor.type}</p>

        ${
          hasToShowNoiseWarnings
            ? `<div style='display: flex; justify-content: center;'>
        <div style='width: 100px; height: 100px; background-color: ${color}; border-radius: 50%; display: flex; align-items: center;'>
        <div style='padding: 10px; color: ${textColor}'>
          <p style='text-align: center;'>${
            measurement ? Number(measurement) : "--"
          } <span style='font-weight: 500;'>${
                sensor.measurementUnit
              }</span> (${message})</p>
        </div>
        </div>
        </div>
        
        ${
          hasToShowWarning
            ? `
        <div style='display: flex; justify-content: center; padding: 10px'>
          <p style='text-align: center;'><strong style='color: ${color}'>ADVERTENCIA:</strong> Exponerse en esta zona por períodos prolongados de tiempo podría afectar permanentemente a su audición</p>
        </div>
        `
            : ""
        }`
            : `<div style='display: flex; justify-content: center;'>
        <div style='width: 100px; height: 100px; background-color: #79BBE6; border-radius: 10%; display: flex; align-items: center; justify-content: center;'>
        <div style='padding: 10px; color: #000000; text-align: center;'>
          <p style='margin: 0; padding-bottom: 10px; font-weight: 600;'>Medición:</p>
          <p style='text-align: center;'>${
            measurement ? Number(measurement) : "--"
          } <span style='font-weight: 500;'>${sensor.measurementUnit}</span></p>
        </div>
        </div>
        </div>`
        }

        <div style='display: flex; justify-content: center;  margin-top: 10px;'>
          <img style='width: 80px'; object-fit: cover; margin: 0 auto:' src=${"https://cdn-icons-png.flaticon.com/512/853/853483.png?w=740&t=st=1671568416~exp=1671569016~hmac=dc7cb683e4ce77f84b41e4284fafb7cf96b71222c160dc89fad5e4e9f215990c"} />
        </div>

        `
        );

        const el = document.createElement("div");
        el.className = "marker";
        el.style.backgroundImage = `url(https://cdn-icons-png.flaticon.com/512/853/853483.png?w=740&t=st=1671568416~exp=1671569016~hmac=dc7cb683e4ce77f84b41e4284fafb7cf96b71222c160dc89fad5e4e9f215990c)`;
        el.style.width = `35px`;
        el.style.height = `35px`;
        el.style.backgroundSize = "contain";

        let markerInstance = new Marker(el).setLngLat(marker);

        if (sensor.id in markersBySensor) {
          const previousMarker = markersBySensor[sensor.id];

          markerInstance = previousMarker;

          const hasBeenOpened = markerInstance.getPopup().isOpen();

          markerInstance.remove();

          const el = document.createElement("div");
          el.className = "marker";
          el.style.backgroundImage = `url(https://cdn-icons-png.flaticon.com/512/853/853483.png?w=740&t=st=1671568416~exp=1671569016~hmac=dc7cb683e4ce77f84b41e4284fafb7cf96b71222c160dc89fad5e4e9f215990c)`;
          el.style.width = `35px`;
          el.style.height = `35px`;
          el.style.backgroundSize = "contain";

          const newMarker = new Marker(el).setLngLat(marker);

          newMarker.setPopup(myLocationPopup);
          newMarker.addTo(mapInstance);

          if (hasBeenOpened) newMarker.togglePopup();

          markerInstance = newMarker;
        } else {
          markerInstance.setPopup(myLocationPopup);
          markerInstance.addTo(mapInstance);
        }

        setMarkersBySensor((currentData) => ({
          ...currentData,
          [sensor.id]: markerInstance,
        }));
      });
    }
  }, [mapInstance, lastSensorMetrics, lastSensorData]);

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
      ></div>
    </>
  );
};
