import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { NoiseRoutes } from "../Noise/routes/NoiseRoutes";

export const AppRouter = () => {
  return (
    <Routes>
      {/* Login y registro */}
      <Route path="/auth/*" element={<AuthRoutes />} />

      {/*  Aplicacion */}
      <Route path="/*" element={<NoiseRoutes />} />

      <Route />
    </Routes>
  );
};
