import React, { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import propTypes from "prop-types";

const AdoptionForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    reason: "",
    experience: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Adoption Application
      </Typography>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Reason for Adoption"
        name="reason"
        value={formData.reason}
        onChange={handleChange}
        fullWidth
        multiline
        rows={4}
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Experience with Pets"
        name="experience"
        value={formData.experience}
        onChange={handleChange}
        fullWidth
        multiline
        rows={4}
        required
        sx={{ mb: 2 }}
      />
      <Button variant="contained" type="submit" sx={{ mt: 2 }}>
        Submit Adoption Form
      </Button>
    </Box>
  );
};

export default AdoptionForm;
