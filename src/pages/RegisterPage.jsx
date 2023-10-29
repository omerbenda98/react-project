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
import UserAvatar from "../components/Navbar/NavProfile";
import useFileUpload from "../hooks/useFileUpload";

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
      await axios.post("/users/register", {
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
      });

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
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
    const joiResponse = validateRegisterSchema(newInputState);
    if (!joiResponse) {
      setIsDisabled(false);
      setInputsErrorsState(null);
    } else {
      setInputsErrorsState(joiResponse);
      setIsDisabled(true);
    }
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
      <div className="register-container">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {preview ? (
            <img src={preview} alt="Profile Preview" className="user-img" />
          ) : (
            <UserAvatar />
          )}
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="div" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={inputState.firstName}
                  onChange={handleInputChange}
                />
                {inputsErrorsState && inputsErrorsState.firstName && (
                  <Alert severity="warning">
                    {inputsErrorsState.firstName.map((item) => (
                      <div key={"firstName-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="middleName"
                  label="middle-name"
                  type="middleName"
                  id="middleName"
                  autoComplete="middle-name"
                  value={inputState.middleName}
                  onChange={handleInputChange}
                />
                {inputsErrorsState && inputsErrorsState.middleName && (
                  <Alert severity="warning">
                    {inputsErrorsState.password.map((item) => (
                      <div key={"middleName-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={inputState.lastName}
                  onChange={handleInputChange}
                />
                {inputsErrorsState && inputsErrorsState.lastName && (
                  <Alert severity="warning">
                    {inputsErrorsState.lastName.map((item) => (
                      <div key={"lastName-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={6}>
                <TextField
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
                  <Alert severity="warning">
                    {inputsErrorsState.phone.map((item) => (
                      <div key={"phone-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={inputState.email}
                  onChange={handleInputChange}
                />
                {inputsErrorsState && inputsErrorsState.email && (
                  <Alert severity="warning">
                    {inputsErrorsState.email.map((item) => (
                      <div key={"email-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={6}>
                <TextField
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
                  <Alert severity="warning">
                    {inputsErrorsState.password.map((item) => (
                      <div key={"password-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>

              <Grid item xs={6}>
                <TextField
                  name="state"
                  label="State"
                  type="state"
                  id="state"
                  autoComplete="state"
                  value={inputState.state}
                  onChange={handleInputChange}
                />
                {inputsErrorsState && inputsErrorsState.state && (
                  <Alert severity="warning">
                    {inputsErrorsState.state.map((item) => (
                      <div key={"state-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={6}>
                <TextField
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
                  <Alert severity="warning">
                    {inputsErrorsState.country.map((item) => (
                      <div key={"country-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={6}>
                <TextField
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
                  <Alert severity="warning">
                    {inputsErrorsState.city.map((item) => (
                      <div key={"city-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={6}>
                <TextField
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
                  <Alert severity="warning">
                    {inputsErrorsState.street.map((item) => (
                      <div key={"street-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={6}>
                <TextField
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
                  <Alert severity="warning">
                    {inputsErrorsState.houseNumber.map((item) => (
                      <div key={"houseNumber-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="zipCode"
                  label="ZipCode"
                  type="zipCode"
                  id="zipCode"
                  autoComplete="zipCode"
                  value={inputState.zipCode}
                  onChange={handleInputChange}
                />
                {inputsErrorsState && inputsErrorsState.zipCode && (
                  <Alert severity="warning">
                    {inputsErrorsState.zipCode.map((item) => (
                      <div key={"zipCode-errors" + item}>{item}</div>
                    ))}
                  </Alert>
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
              <Grid item xs={6}>
                <div>
                  <p>Choose Profile picture</p>
                  <input type="file" onChange={handleImgChange} />
                </div>
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="success"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleBtnClick}
              disabled={isDisabled}
            >
              Sign Up
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleResetClick}
            >
              reset
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="error"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleCancelBtnClick}
            >
              Cancel
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    </div>
  );
};
export default RegisterPage;
