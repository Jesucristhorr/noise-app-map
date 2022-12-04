import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { MapView } from "../components/MapView";
import { NoiseLayout } from "../layout/NoiseLayout";
import { InfoNoise } from "../views/InfoNoise";

const noiseleves = [
  {
    id: new Date().getTime(),
    soundPressure: "120",
    appreciation: "Excesivamente ruidoso",
    example: "Umbral de malestar",
  },
  {
    id: new Date().getTime() + 2,
    soundPressure: "120",
    appreciation: "Excesivamente ruidoso",
    example: "Umbral de malestar",
  },
  {
    id: new Date().getTime() + 1,
    soundPressure: "120",
    appreciation: "Excesivamente ruidoso",
    example: "Umbral de malestar",
  },
];

export const InformationNoisePage = () => {
  const { isLoading, userLocation } = useSelector((state) => state.map);

  return (
    <NoiseLayout>
      <Typography variant="h4" color={"primary"} sx={{ fontWeight: "bold" }}>
        MONITOREO DE RUIDO AMBIENTAL EN MANTA
      </Typography>
      <Typography variant="h6">
        Solución de IoT para la medición de Ruido Ambiental
      </Typography>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
      <Typography variant="h6">
        Escala de Ruido recomendado por la OMS
      </Typography>
      {/* TABLA DE NIVELES DE RUIDO POR OMS */}
      <TableContainer>
        <Table sx={{ minWidth: 650, width: "85%", sm: "", margin: "0 auto" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "170px" }}>
                Nivel de presión sonora, ruido (dB)
              </TableCell>
              <TableCell>Apreciación</TableCell>
              <TableCell>Ejemplos de fuentes sonoras</TableCell>
            </TableRow>
          </TableHead>
          {/* Body */}
          <TableBody>
            {noiseleves.map((level) => (
              <TableRow key={level.id}>
                <TableCell>{level.soundPressure}</TableCell>
                <TableCell>{level.appreciation}</TableCell>
                <TableCell>{level.example}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </NoiseLayout>
  );
};
