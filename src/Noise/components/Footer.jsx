import { Box, Button, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Box
      component="div"
      sx={{
        p: 2,
        border: "1px dashed grey",
        position: "absolute",
        backgroundColor: "#fff",

        // width: "100%",
        zIndex: "999",
        width: { sm: `calc(100% - ${240}px)` },
        ml: { sm: `${240}px` },
        bottom: 0,

        // backgroundColor: "#",
      }}
    >
      <Typography>Desarrollado por Jennifer y Jesus</Typography>
    </Box>
  );
};
