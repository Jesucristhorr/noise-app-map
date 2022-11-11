import { Navigate, Route, Routes } from "react-router-dom";
import { NoisePage } from "../pages/NoisePage";

export const NoiseRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<NoisePage />} />

      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
