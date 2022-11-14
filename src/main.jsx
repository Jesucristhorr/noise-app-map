import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { NoiseApp } from "./NoiseApp";
import "./styles.css";

// Configuracion global de mapbox
import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl')
mapboxgl.accessToken =
  "pk.eyJ1IjoiamVubmlmZXIyODAzIiwiYSI6ImNsYWd6bGR4MDA4eWMzb204b2Rub21oZG8ifQ.KLpITuBJe3LCokg7ncnQFQ";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <NoiseApp />
    </BrowserRouter>
  </React.StrictMode>
);
