import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { NoiseRoutes } from "../Noise/routes/NoiseRoutes";

import { CheckingAuth } from "../ui/components/CheckingAuth";

import { useCheckAuth } from "../hooks/useCheckAuth";
import { useSelector } from "react-redux";
import { NoisePage } from "../Noise/pages/NoisePage";
import { InformationNoisePage } from "../Noise/pages/InformationNoisePage";

export const AppRouter = () => {
  const { status } = useCheckAuth();
  // const { status } = useSelector((state) => state.auth);

  if (status === "checking") {
    return <CheckingAuth />;
  }
  return (
    <Routes>
      <Route path="/" element={<NoisePage />} />

      <Route path="/information" element={<InformationNoisePage />} />

      {status === "authenticated" ? (
        <Route path="/*" element={<NoiseRoutes />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}

      {/* Login y registro */}
      {/* <Route path="/auth/*" element={<AuthRoutes />} /> */}

      {/*  Aplicacion */}
      {/* <Route path="/*" element={<NoiseRoutes />} /> */}

      <Route path="/*" element={<Navigate to="/auth/login" />} />
      <Route />
    </Routes>
  );
};
