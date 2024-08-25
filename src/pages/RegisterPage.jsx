import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import validateRegisterSchema from "../validation/registerValidation";
import ROUTES from "../routes/ROUTES";
import useFileUpload from "../hooks/useFileUpload";
import { styled } from "@mui/material/styles";
import UploadIcon from "@mui/icons-material/Upload";
import Avatar from "@mui/material/Avatar";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  maxWidth: 800,
  margin: "0 auto",
}));

const StyledGrid = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 100,
  height: 100,
  marginBottom: 16,
  border: "none",
}));

const RegisterPage = () => {
  const [inputState, setInputState] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    imageUrl: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zipCode: "",
    biz: false,
  });
  const [inputsErrorsState, setInputsErrorsState] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();

  const { preview, handleFileChange, handleUpload } = useFileUpload();

  const handleFileUpload = async () => {
    const newImageUrl = await handleUpload(setInputState);
    if (newImageUrl) {
      setInputState((prev) => ({ ...prev, imageUrl: newImageUrl }));
    }
    return newImageUrl;
  };
  const handleImgChange = (event) => {
    handleFileChange(event);
  };

  const handleBtnClick = async (ev) => {
    try {
      const joiResponse = validateRegisterSchema(inputState);
      setInputsErrorsState(joiResponse);
      if (joiResponse) {
        toast.error("oops");

        return;
      }
      await handleFileUpload();
      await axios.post(
        "https://dog-adopt-app-ae8e92c9ad07.herokuapp.com/api/users/register",
        {
          firstName: inputState.firstName,
          middleName: inputState.middleName,
          lastName: inputState.lastName,
          phone: inputState.phone,
          email: inputState.email,
          password: inputState.password,
          state: inputState.state,
          country: inputState.country,
          city: inputState.city,
          imageUrl: inputState.imageUrl,
          street: inputState.street,
          houseNumber: inputState.houseNumber,
          zipCode: inputState.zipCode,
          biz: inputState.biz,
        }
      );

      if (!joiResponse) {
        navigate(ROUTES.LOGIN);
      }
    } catch (err) {
      console.log("error from axios", err.response.data);
    }
  };
  const handleCancelBtnClick = (ev) => {
    navigate(ROUTES.HOME);
  };
  const handleInputChange = (ev) => {
    const { id, value } = ev.target;
    setInputState((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    // Validate only the changed field
    const fieldToValidate = { [id]: value };
    const fieldError = validateRegisterSchema(fieldToValidate);

    setInputsErrorsState((prevErrors) => ({
      ...prevErrors,
      [id]: fieldError ? fieldError[id] : null,
    }));

    // Check if the entire form is valid
    const updatedInputState = { ...inputState, [id]: value };
    const joiResponse = validateRegisterSchema(updatedInputState);
    setIsDisabled(!!joiResponse);
  };
  const handleCheckboxChange = (ev) => {
    setInputState((prevState) => ({
      ...prevState,
      biz: ev.target.checked,
    }));
  };
  const handleResetClick = (ev) => {
    setInputState({
      firstName: "",
      middleName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: "",
      zipCode: "",
      biz: false,
    });
    setInputsErrorsState(null);
  };
  return (
    <div className="register-big-container">
      <StyledBox className="register-container">
        {preview ? (
          <img
            src={preview}
            alt="Profile Preview"
            className="user-img"
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              marginBottom: 16,
            }}
          />
        ) : (
          <StyledAvatar />
        )}
        <Typography component="h1" variant="h4" gutterBottom>
          Sign up
        </Typography>
        <StyledGrid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              id="firstName"
              label="First Name"
              autoFocus
              value={inputState.firstName}
              onChange={handleInputChange}
            />
            {inputsErrorsState && inputsErrorsState.firstName && (
              <Alert severity="warning">{inputsErrorsState.firstName}</Alert>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="middleName"
              label="Middle Name"
              type="middleName"
              autoComplete="middle-name"
              value={inputState.middleName}
              onChange={handleInputChange}
            />
            {inputsErrorsState && inputsErrorsState.middleName && (
              <Alert severity="warning">{inputsErrorsState.middleName}</Alert>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              value={inputState.lastName}
              onChange={handleInputChange}
            />
            {inputsErrorsState && inputsErrorsState.lastName && (
              <Alert severity="warning">{inputsErrorsState.lastName}</Alert>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              name="phone"
              label="Phone"
              type="phone"
              id="phone"
              autoComplete="phone-number"
              value={inputState.phone}
              onChange={handleInputChange}
            />
            {inputsErrorsState && inputsErrorsState.phone && (
              <Alert severity="warning">{inputsErrorsState.phone}</Alert>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={inputState.email}
              onChange={handleInputChange}
            />
            {inputsErrorsState && inputsErrorsState.email && (
              <Alert severity="warning">{inputsErrorsState.email}</Alert>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={inputState.password}
              onChange={handleInputChange}
            />
            {inputsErrorsState && inputsErrorsState.password && (
              <Alert severity="warning">{inputsErrorsState.password}</Alert>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="state"
              label="State"
              type="state"
              id="state"
              autoComplete="state"
              value={inputState.state}
              onChange={handleInputChange}
            />
            {inputsErrorsState && inputsErrorsState.state && (
              <Alert severity="warning">{inputsErrorsState.state}</Alert>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              name="country"
              label="Country"
              type="country"
              id="country"
              autoComplete="country"
              value={inputState.country}
              onChange={handleInputChange}
            />
            {inputsErrorsState && inputsErrorsState.country && (
              <Alert severity="warning">{inputsErrorsState.country}</Alert>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              name="city"
              label="City"
              type="city"
              id="city"
              autoComplete="city"
              value={inputState.city}
              onChange={handleInputChange}
            />
            {inputsErrorsState && inputsErrorsState.city && (
              <Alert severity="warning">{inputsErrorsState.city}</Alert>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              name="street"
              label="Street"
              type="street"
              id="street"
              autoComplete="street"
              value={inputState.street}
              onChange={handleInputChange}
            />
            {inputsErrorsState && inputsErrorsState.street && (
              <Alert severity="warning">{inputsErrorsState.street}</Alert>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              name="houseNumber"
              label="HouseNumber"
              type="houseNumber"
              id="houseNumber"
              autoComplete="houseNumber"
              value={inputState.houseNumber}
              onChange={handleInputChange}
            />
            {inputsErrorsState && inputsErrorsState.houseNumber && (
              <Alert severity="warning">{inputsErrorsState.houseNumber}</Alert>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="zipCode"
              label="ZipCode"
              type="zipCode"
              id="zipCode"
              autoComplete="zipCode"
              value={inputState.zipCode}
              onChange={handleInputChange}
            />
            {inputsErrorsState && inputsErrorsState.zipCode && (
              <Alert severity="warning">{inputsErrorsState.zipCode}</Alert>
            )}
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={inputState.biz}
                  onChange={handleCheckboxChange}
                  name="biz"
                  color="primary"
                />
              }
              label="I have a dog for adoption!"
            />
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              onChange={handleImgChange}
              style={{ display: "none" }}
              id="profile-picture-input"
            />
            <label htmlFor="profile-picture-input">
              <Button
                variant="outlined"
                component="span"
                fullWidth
                startIcon={<UploadIcon />}
              >
                Choose Profile Picture
              </Button>
            </label>
          </Grid>
        </StyledGrid>
        <Box sx={{ mt: 3, width: "100%" }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleBtnClick}
            disabled={isDisabled}
            sx={{ mb: 2 }}
          >
            Sign Up
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleResetClick}
            sx={{ mb: 2 }}
          >
            Reset
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="error"
            onClick={handleCancelBtnClick}
          >
            Cancel
          </Button>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Link href="#" variant="body2">
            Already have an account? Sign in
          </Link>
        </Box>
      </StyledBox>
    </div>
  );
};
export default RegisterPage;
