import { Navigate, Route, Routes } from "react-router-dom";
import { InformationNoisePage } from "../pages/InformationNoisePage";
import { ManageSensors } from "../pages/ManageSensors";
import { NoiseLeves } from "../pages/NoiseLeves";
import { NoisePage } from "../pages/NoisePage";

export const NoiseRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<NoisePage />} />

      <Route path="/information" element={<InformationNoisePage />} />

      <Route path="/noise-leves" element={<NoiseLeves />} />

      <Route path="/manage-sensors" element={<ManageSensors />} />

      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
