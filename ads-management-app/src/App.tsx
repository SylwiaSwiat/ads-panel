import "./App.css";
import { Container, Switch, Box, CssBaseline } from "@mui/material";
import Home from "./components/Home";
import AdsList from "./components/AdsList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import { useEffect, useState } from "react";
import AdForm from "./components/AdForm";
import { createTheme, ThemeProvider } from "@mui/material";
import { DarkModeRounded, LightModeRounded } from "@mui/icons-material";

export type Ad = {
  id: string;
  name: string;
  content: string;
  startDate: string;
  endDate: string;
};

function App() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const chosenMode = localStorage.getItem("mode");
    if (chosenMode === "light" || chosenMode === "dark") {
      setMode(chosenMode);
    } else {
      setMode("light");
    }
    setLoading(false);
  }, []);

  const lightTheme = createTheme({
    palette: {
      mode: "light",
      background: {
        default: "#f5f5f5",
      },
      primary: {
        main: "#4169E1",
      },
      secondary: {
        main: "#242424",
      },
      error: {
        main: "#E2005A",
      },
    },
    typography: {
      fontFamily: "'Poppins', sans-serif",
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "#121212",
      },
      error: {
        main: "#d61f68",
      },
    },

    typography: {
      fontFamily: "'Poppins', sans-serif",
    },
  });

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("mode", newMode);
  };

  const theme = mode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!loading && (
        <Router>
          <Container
            sx={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
              }}
            ></Box>

            <Box
              sx={{
                position: "absolute",
                top: "1rem",
                right: "2rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <LightModeRounded />
              <Switch
                checked={mode === "dark"}
                onChange={toggleTheme}
                inputProps={{ "aria-label": "controlled" }}
              />
              <DarkModeRounded />
            </Box>

            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route
                path="/advertisements"
                element={<AdsList ads={ads} setAds={setAds} />}
              />
              <Route path="/error" element={<ErrorPage />}></Route>
              <Route
                path="/advertisements/new"
                element={<AdForm ads={ads} setAds={setAds} editing={false} />}
              />
              <Route
                path="/advertisements/edit/:id"
                element={<AdForm ads={ads} setAds={setAds} editing={true} />}
              />
            </Routes>
          </Container>
        </Router>
      )}
    </ThemeProvider>
  );
}

export default App;
