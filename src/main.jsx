import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { NoiseApp } from "./NoiseApp";
import "./styles.css";

// Configuracion global de mapbox
import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl')
import { Provider } from "react-redux";
import { store } from "./store";

//Configuracion de mapbox
mapboxgl.accessToken =
  "pk.eyJ1IjoiamVubmlmZXIyODAzIiwiYSI6ImNsYWd6bGR4MDA4eWMzb204b2Rub21oZG8ifQ.KLpITuBJe3LCokg7ncnQFQ";

// Evaluar si el user cuenta con geolocalizacion
if (!navigator.geolocation) {
  alert("Tu navegador no tiene opcion de Geolocation");
  throw new Error("Tu navegador no tiene opcion de Geolocation");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <NoiseApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
