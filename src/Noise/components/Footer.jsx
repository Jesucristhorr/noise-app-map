import { Box, Button, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Box
      component="div"
      sx={{
        p: 2,
        border: "1px dashed grey",

        // width: "100%",
        width: { sm: `calc(100% - ${240}px)` },
        ml: { sm: `${240}px` },

        // backgroundColor: "#",
      }}
    >
      <Typography>FOOTER</Typography>
    </Box>
  );
};
