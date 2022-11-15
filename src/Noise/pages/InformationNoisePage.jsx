import { Typography } from "@mui/material";
import { NoiseLayout } from "../layout/NoiseLayout";
import { InfoNoise } from "../views/InfoNoise";

export const InformationNoisePage = () => {
  return (
    <NoiseLayout>
      <Typography variant="h3">Informacion de niveles de ruidos</Typography>
    </NoiseLayout>
    // <InfoNoise />
  );
};
