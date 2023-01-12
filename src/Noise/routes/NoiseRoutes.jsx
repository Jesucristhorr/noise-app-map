import { Navigate, Route, Routes } from "react-router-dom";
import { InformationNoisePage } from "../pages/InformationNoisePage";
import { ManageSensors } from "../pages/ManageSensors";
import { NoiseLeves } from "../pages/NoiseLeves";
import { NoisePage } from "../pages/NoisePage";

import { Register } from "../pages/Register";
import { useSelector } from "react-redux";

export const NoiseRoutes = () => {
  const { status } = useSelector((state) => state.auth);
  return (
    <Routes>
      <Route path="/" element={<NoisePage />} />

      <Route path="/information" element={<InformationNoisePage />} />

      {/* {status === "authenticated" ? (
        <Route>
          <Route path="/noise-leves" element={<NoiseLeves />} />
          <Route path="/manage-sensors" element={<ManageSensors />} />
          <Route path="/manage-users" element={<Register />} />
        </Route>
      ) : (
        <Route path="/*" element={<Navigate to="/" />} />
      )} */}

      <Route path="/noise-leves" element={<NoiseLeves />} />
      <Route path="/manage-sensors" element={<ManageSensors />} />
      <Route path="/manage-users" element={<Register />} />

      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
