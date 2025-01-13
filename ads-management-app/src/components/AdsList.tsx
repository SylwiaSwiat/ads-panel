import {
  Box,
  List,
  Typography,
  Button,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import data from "../data/Data";
import { Ad } from "../App";
import AdForm from "./AdForm";

type AdsListProps = {
  ads: Array<Ad>;
  setAds: React.Dispatch<React.SetStateAction<Ad[]>>;
};

const AdsList = ({ ads, setAds }: AdsListProps) => {
  const [editedAd, setEditedAd] = useState<Ad>();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const savedAds = localStorage.getItem("ads");
    setAds(savedAds ? JSON.parse(savedAds) : ads);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (id: string) => {
    const updatedAds = ads.filter((ad) => ad.id !== id);
    setAds(updatedAds);
    localStorage.setItem("ads", JSON.stringify(updatedAds));
  };

  const handleShowData = () => {
    const exampleData = data;
    setAds(exampleData);
    localStorage.setItem("ads", JSON.stringify(exampleData));
  };

  const handleEdit = (ad: Ad) => {
    setEditedAd(ad);
    handleScrollTo();
  };

  const handleScrollTo = () => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <Box sx={{ p: 2, maxHeight: "calc(100vh - 4rem)", maxWidth: 800 }}>
      <Typography
        sx={{ fontSize: { xs: "2rem", md: "3rem", color: "secondary" } }}
      >
        Advertisement List
      </Typography>

      <Box
        sx={{
          my: 2,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 1, md: 2 },
        }}
      >
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/advertisements/new"
          sx={{
            width: {
              xs: "100%",
              md: "12rem",
            },
          }}
        >
          Create New Ad
        </Button>

        <Button
          variant="contained"
          color="primary"
          sx={{
            width: {
              xs: "100%",
              md: "12rem",
            },
          }}
          onClick={handleShowData}
        >
          Show Example Data
        </Button>

        <IconButton
          edge="end"
          aria-label="add"
          color="success"
          onClick={() => {
            setEditedAd(undefined);
            handleScrollTo();
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>

      {ads.length === 0 ? (
        <Typography sx={{ color: "secondary" }}>
          No advertisements available.
        </Typography>
      ) : (
        <List>
          {ads.map((ad) => (
            <ListItem
              key={ad.id}
              divider
              secondaryAction={
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexDirection: { xs: "column", md: "row" },
                  }}
                >
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    color="primary"
                    onClick={() => handleEdit(ad)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    color="error"
                    onClick={() => handleDelete(ad.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              }
              sx={{ pl: 0, pr: { xs: "4rem", md: "6rem" } }}
            >
              <ListItemText
                primary={
                  <Typography
                    component="span"
                    sx={{
                      color: "secondary",
                      fontSize: { xs: "1.25rem", md: "2rem" },
                    }}
                  >
                    {ad.name}
                  </Typography>
                }
                secondary={
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    {ad.content && (
                      <Typography
                        component="div"
                        sx={{
                          pt: 2,
                          pb: 1,
                          whiteSpace: "normal",
                          wordWrap: "break-word",
                          overflowWrap: "break-word",
                          fontSize: { xs: ".875rem", md: "1rem" },
                        }}
                      >
                        {ad.content}
                      </Typography>
                    )}
                    <Typography component="span">
                      Start: {ad.startDate}
                    </Typography>
                    <Typography component="span">End: {ad.endDate}</Typography>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      )}

      {editedAd?.id ? (
        <AdForm
          ads={ads}
          setAds={setAds}
          editedAd={editedAd}
          editing={true}
          ref={ref}
        />
      ) : (
        <AdForm ads={ads} setAds={setAds} editing={false} ref={ref} />
      )}
      <Box sx={{ height: "2rem" }} />
    </Box>
  );
};

export default AdsList;
