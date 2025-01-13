import { useEffect, useState, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  FormHelperText,
} from "@mui/material";
import { Ad } from "../App";

type AdFormProps = {
  ads: Array<Ad>;
  setAds: React.Dispatch<React.SetStateAction<Ad[]>>;
  editedAd?: Ad;
  editing: boolean;
};

const AdForm = forwardRef<HTMLElement, AdFormProps>(
  ({ ads, setAds, editedAd, editing }: AdFormProps, ref) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      name: "",
      content: "",
      startDate: "",
      endDate: "",
    });

    const [errors, setErrors] = useState({
      name: "",
      content: "",
      startDate: "",
      endDate: "",
    });

    const [contentLength, setContentLength] = useState(0);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { name, content, startDate, endDate } = formData;
      let validForm = true;
      const newErrors = { name: "", content: "", startDate: "", endDate: "" };

      if (!name || name === "") {
        newErrors.name = "Name is required";
        validForm = false;
      }

      if (ads.some((ad) => ad.name === name && ad.id !== editedAd?.id)) {
        newErrors.name = "Name already exists";
        validForm = false;
      }

      if (!content || content === "") {
        newErrors.content = "Content is required";
        validForm = false;
      }

      if (!startDate || startDate === "") {
        newErrors.startDate = "Start date is required";
        validForm = false;
      }

      if (new Date(startDate) < new Date(Date.now())) {
        newErrors.startDate = "Start date must be in the future";
        validForm = false;
      }

      if (!endDate || endDate === "") {
        newErrors.endDate = "End date is required";
        validForm = false;
      }

      if (new Date(startDate) > new Date(endDate)) {
        newErrors.endDate = "The end date must be later than the start date";
        validForm = false;
      }

      setErrors(newErrors);

      if (!validForm) return;

      const newAd = {
        id:
          editing && editedAd?.id
            ? editedAd?.id
            : `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        ...formData,
      };

      const updatedAds = !editing
        ? [...ads, newAd]
        : ads.map((ad) => (ad.id !== editedAd?.id ? ad : newAd));
      setAds(updatedAds);
      localStorage.setItem("ads", JSON.stringify(updatedAds));
      navigate("/advertisements");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });

      if (e.target.name === "content") {
        setContentLength(e.target.value.length);
      }
    };

    const handleEdit = () => {
      if (editedAd && editing) {
        setFormData({
          name: editedAd.name,
          content: editedAd.content,
          startDate: editedAd.startDate,
          endDate: editedAd.endDate,
        });
      } else {
        setFormData({
          name: "",
          content: "",
          startDate: "",
          endDate: "",
        });
      }
    };

    useEffect(() => {
      handleEdit();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editedAd, editing]);

    return (
      <Box ref={ref} sx={{ my: 2 }}>
        <Paper elevation={6} sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
          <Typography
            gutterBottom
            sx={{
              fontSize: { xs: "2rem", md: "3rem", color: "secondary" },
            }}
          >
            {editing ? "Edit Advertisement" : "Create New Advertisement"}
          </Typography>
          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  error={!!errors.name}
                />
                {errors.name && (
                  <FormHelperText error>{errors.name}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  required
                  error={!!errors.content}
                  inputProps={{
                    maxLength: 500,
                  }}
                />
                {errors.content && (
                  <FormHelperText error>{errors.content}</FormHelperText>
                )}

                <Typography
                  variant="body2"
                  color="secondary"
                  align="right"
                  sx={{ mt: 1 }}
                >
                  {500 - contentLength}/500
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Start Date"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  required
                  error={!!errors.startDate}
                />
                {errors.startDate && (
                  <FormHelperText error>{errors.startDate}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="End Date"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  required
                  error={!!errors.endDate}
                />
                {errors.endDate && (
                  <FormHelperText error>{errors.endDate}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                >
                  Save Advertisement
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    );
  }
);

export default AdForm;
