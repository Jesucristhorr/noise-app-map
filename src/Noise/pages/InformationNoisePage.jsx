import {
  Avatar,
  Box,
  Divider,
  Grid,
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
import { Cards } from "../components/Cards";

const noiseleves = [
  {
    id: 1,
    soundPressure: "120",
    appreciation: "Excesivamente ruidoso",
    example: "Umbral de malestar",
    color: "#EA2027",
  },
  {
    id: 2,
    soundPressure: "110",
    appreciation: "Excesivamente ruidoso",
    example: "Aeropuerto",
    color: "#EE5A24",
  },
  {
    id: 3,
    soundPressure: "100",
    appreciation: "Excesivamente ruidoso",
    example: "Moto, fábrica",
    color: "#F79F1F",
  },
  {
    id: 4,
    soundPressure: "90",
    appreciation: "Muy ruidoso",
    example: " Camión con motor diésel, cortadora de césped",
    color: "#FFC312",
  },
  {
    id: 5,
    soundPressure: "80",
    appreciation: "Muy ruidoso",
    example: "Música a todo volumen, alarma de reloj, secador de cabello",
    color: "#f8c291",
  },
  {
    id: 6,
    soundPressure: "70",
    appreciation: "Ruidoso",
    example: "Tráfico, aspiradora, restaurant",
    color: "#fad390",
  },
  {
    id: 7,
    soundPressure: "60",
    appreciation: "Poco ruidoso",
    example: "Conversación",
    color: "#78e08f",
  },
  {
    id: 8,
    soundPressure: "50",
    appreciation: "Poco ruidoso",
    example: "Oficina tranquila, lluvia moderada",
    color: "#b8e994",
  },
  {
    id: 9,
    soundPressure: "40",
    appreciation: "Silencioso",
    example: "Refrigerador, cantar de aves.",
    color: "#C4E538",
  },
  {
    id: 10,
    soundPressure: "30",
    appreciation: "Silencioso",
    example: "Biblioteca tranquila, susurros, área rural tranquila",
    color: "#A3CB38",
  },
  {
    id: 11,
    soundPressure: "20",
    appreciation: "Muy silencioso",
    example: "Estudio de grabación, crujir de hojas secas",
    color: "#4cd137",
  },
  {
    id: 12,
    soundPressure: "10",
    appreciation: "Muy silencioso",
    example: "Cámara aenoica, respiración",
    color: "#009432",
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
        La contaminación acústica es un problema creciente en las cuidades y
        zonas urbanas debido a la evolución industrial y crecimiento
        territorial. Estudios han demostrado que la exposición constante al
        ruido tiene serias consecuencias en la salud de las personas afectando
        la calidad de vida. Por lo tanto, es necesario contar con soluciones
        tecnológicas que permitan la recolección y medición de ruido ambiental
        para conocer su estado y de esta manera proponer soluciones de este
        contexto. El presente proyecto de investigación y desarrollo tecnológico
        está basado en la creación de una solución de IoT para monitoriar los
        niveles de ruido presente y brindar esta información a la comunidad
        universitaria. Esta solución consta de un Sistema Web y un Prototipo
        encargado de capturar los niveles de ruido.
      </p>
      <Typography variant="h6">
        Escala de Ruido recomendado por la OMS
      </Typography>
      {/* TABLA DE NIVELES DE RUIDO POR OMS */}
      <TableContainer sx={{ mt: "24px", width: { md: "100%", xs: "340px" } }}>
        <Table
          sx={{ minWidth: 600, width: "85%", sm: "", margin: "0 auto" }}
          size="small"
        >
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
                <TableCell sx={{ backgroundColor: level.color }}>
                  {level.soundPressure}
                </TableCell>
                <TableCell>{level.appreciation}</TableCell>
                <TableCell>{level.example}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <Box marginTop={5}>
        <Grid container spacing={2} columns={16}>
          <Grid item md={8} xs={16}>
            <Typography variant="h6" color="#636e72">
              Solución de IoT de Ruido Ambiental
            </Typography>
            <Typography variant="p" fontWeight="bold" color="primary">
              2023 - ULEAM
            </Typography>
            <Avatar
              sx={{ width: 300, height: 200 }}
              variant="square"
              src="https://ik.imagekit.io/hpmztn0eqra/LOGO-ULEAM-HORIZONTAL_0youY46RE.png?ik-sdk-version=javascript-1.4.3&updatedAt=1609345113962"
            />
          </Grid>
          <Grid item md={8} xs={16}>
            <Typography variant="h8" fontWeight="bold" color="primary">
              SUPERVISOR DEL PROYECTO
            </Typography>
            <Typography>Ing. Mike Machuca, Mg.</Typography>
            <Typography>mike@uleam.edu.ec</Typography>
            <Typography fontWeight="bold">
              Docente de la Facultad de Ciencias Informáticas
            </Typography>
            <Divider sx={{ padding: "10px" }} />
            <Typography variant="h8" fontWeight="bold" color="primary">
              DESARROLLADORES DEL PROYECTO
            </Typography>
            <Typography>Jesús Ricardo Moreira Cedeño</Typography>
            <Typography>e1351673460@live.uleam.edu.ec</Typography>
            <Typography fontWeight="bold">
              Estudiante de la Facultad de Ciencias Informáticas
            </Typography>
 
            <Typography sx={{ marginTop: "15px" }}>
              Jennifer Gabriela Intriago Reyes
            </Typography>
            <Typography>e1313817817@live.uleam.edu.ec</Typography>
            <Typography fontWeight="bold">
              Estudiante de la Facultad de Ciencias Informáticas
            </Typography>
          </Grid>
        </Grid>
      </Box> */}
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{ mt: "30px", mb: "10px", textAlign: "center" }}
      >
        INTEGRANTES DEL PROYECTO
      </Typography>
      <Cards />

      <Box marginTop={5}>
        <Grid container spacing={2} columns={16} justifyContent="space-around">
          <Grid item md={8} xs={16}>
            <Typography color="#636e72" fontWeight="bold" fontSize="12px">
              Solución de IoT de Ruido Ambiental
            </Typography>
            <Typography fontWeight="bold" color="primary" fontSize="12px">
              2023 - ULEAM
            </Typography>
          </Grid>
          <Grid item md={8} xs={16}>
            <Avatar
              sx={{ width: 100, height: 50, m: "0 auto" }}
              variant="square"
              src="https://ik.imagekit.io/hpmztn0eqra/LOGO-ULEAM-HORIZONTAL_0youY46RE.png?ik-sdk-version=javascript-1.4.3&updatedAt=1609345113962"
            />
          </Grid>
        </Grid>
      </Box>
    </NoiseLayout>
  );
};
