import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

const ErrorPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Typography sx={{ fontSize: { xs: "2rem", md: "3rem" } }} color="error">
        Oops! Something went wrong.
      </Typography>
      <Typography
        variant="body1"
        sx={{ mb: 4, mt: 2, fontSize: { xs: "1rem", md: "2rem" } }}
      >
        The page you are looking for is unavailable or you do not have access.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        sx={{
          gap: 1,
          width: {
            xs: "100%",
            md: "12rem",
          },
        }}
      >
        Go to Home
        <HomeIcon />
      </Button>
    </Box>
  );
};

export default ErrorPage;
