import { Navigate, Route, Routes } from "react-router-dom";
import { InformationNoisePage } from "../pages/InformationNoisePage";
import { NoisePage } from "../pages/NoisePage";

export const NoiseRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<NoisePage />} />

      <Route path="/information" element={<InformationNoisePage />} />

      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
