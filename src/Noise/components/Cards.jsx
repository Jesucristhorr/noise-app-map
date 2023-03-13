import { AlternateEmail, GitHub, InfoOutlined } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

export const Cards = () => {
  return (
    <>
      <Grid
        container
        spacing={2}
        // sx={{ mt: "70px" }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Card>
            <CardContent>
              <Typography variant="h8" fontWeight="bold" color="primary">
                Supervisor del Proyecto
              </Typography>
              <Avatar sx={{ bgcolor: "#2AB0C3" }}>MA</Avatar>
              <Typography fontWeight="bold">Ing. Mike Machuca, Mg.</Typography>
              <Box display="flex" gap={1}>
                <AlternateEmail sx={{ color: "#636e72" }} />
                <Typography>mike@uleam.edu.ec</Typography>
              </Box>
              <Box display="flex" gap={1}>
                <InfoOutlined sx={{ color: "#636e72" }} />
                <Typography>
                  Docente de la Facultad de Ciencias Informáticas
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/*  */}
        <Grid item>
          <Card>
            <CardContent>
              <Typography variant="h8" fontWeight="bold" color="primary">
                Desarrolladora del proyecto
              </Typography>
              <Avatar src="https://ik.imagekit.io/hpmztn0eqra/pics_vvsO9CqtA.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1671746802801" />
              <Typography fontWeight="bold">
                Jennifer Gabriela Intriago Reyes
              </Typography>
              <Box display="flex" gap={1}>
                <AlternateEmail sx={{ color: "#636e72" }} />
                <Typography>e1313817817@live.uleam.edu.ec</Typography>
              </Box>
              <Box display="flex" gap={1}>
                <InfoOutlined sx={{ color: "#636e72" }} />
                <Typography>
                  Estudiante de la Facultad de Ciencias Informáticas
                </Typography>
              </Box>
              <Box display="flex" gap={1}>
                <GitHub sx={{ color: "#636e72" }} />
                <Typography>jennIntriago</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/*  */}
        <Grid item>
          <Card>
            <CardContent>
              <Typography variant="h8" fontWeight="bold" color="primary">
                Desarrollador del proyecto
              </Typography>
              <Avatar src="https://avatars.githubusercontent.com/u/43868395?v=4" />
              <Typography fontWeight="bold">
                Jesús Ricardo Moreira Cedeño
              </Typography>
              <Box display="flex" gap={1}>
                <AlternateEmail sx={{ color: "#636e72" }} />
                <Typography>e1351673460@live.uleam.edu.ec</Typography>
              </Box>
              <Box display="flex" gap={1}>
                <InfoOutlined sx={{ color: "#636e72" }} />
                <Typography>
                  Estudiante de la Facultad de Ciencias Informáticas
                </Typography>
              </Box>
              <Box display="flex" gap={1}>
                <GitHub sx={{ color: "#636e72" }} />
                <Typography>Jesucristhorr</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
