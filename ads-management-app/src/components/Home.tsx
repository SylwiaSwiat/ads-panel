import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Quote = {
  quote: string;
  author: string;
};

const Home = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const apiUrl = `${import.meta.env.VITE_API_URL}/v1/quotes`;
  const apiKey = import.meta.env.VITE_API_KEY;
  const navigate = useNavigate();

  const getQuote = async () => {
    setLoading(true);
    setError(false);

    try {
      const res = await fetch(apiUrl, {
        headers: {
          "X-Api-Key": apiKey,
        },
      });

      const data = await res.json();
      setQuote(data[0]);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const passwordValidation = () => {
    const pass = prompt("Please enter password");

    if (!pass || pass === "") return;

    if (pass === import.meta.env.VITE_PASSWORD) {
      navigate("/advertisements");
    } else {
      navigate("/error");
    }
  };

  useEffect(() => {
    getQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        py: 1,
        px: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxHeight: "80vh",
      }}
    >
      {loading && <CircularProgress size="2.5rem" color="primary" />}
      {quote && !loading && (
        <>
          <Typography
            sx={{
              color: "secondary",
              fontSize: { xs: "1.5rem", md: "2.5rem" },
              background:
                "-webkit-linear-gradient(45deg, #00CED1 40%, #1E90FF 80%)",
              // "-webkit-linear-gradient(45deg, #FF0080 40%, #8000FF 80%)",
              // "-webkit-linear-gradient(45deg, #8A2BE2 40%, #FF1493 80%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {quote.quote}
          </Typography>

          <Typography
            sx={{
              width: "50%",
              textAlign: "end",
              pr: 1,
              fontSize: { xs: ".625rem", md: ".75rem" },
              fontStyle: "italic",
              color: "#a3a0a0",
            }}
          >
            ~{quote.author}
          </Typography>
        </>
      )}

      {error && !loading && (
        <Typography
          sx={{
            color: "secondary",
            fontSize: { xs: ".875rem", md: "2.5rem" },
          }}
        >
          No quotes for You today, I'm afraid.
        </Typography>
      )}

      <Button
        sx={{
          mt: 6,
          mb: 1,
          width: {
            xs: "100%",
            md: "12rem",
          },
        }}
        variant="contained"
        color="primary"
        onClick={() => passwordValidation()}
      >
        Ads Panel
      </Button>
    </Box>
  );
};

export default Home;
