import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { MapView } from "../components/MapView";
import { NoiseLayout } from "../layout/NoiseLayout";
import { InfoNoise } from "../views/InfoNoise";

export const InformationNoisePage = () => {
  const { isLoading, userLocation } = useSelector((state) => state.map);

  return (
    <NoiseLayout>
      <Typography variant="h4">Informacion de niveles de ruidos</Typography>
      {/* <MapView /> */}
    </NoiseLayout>
    // <InfoNoise />
  );
};
