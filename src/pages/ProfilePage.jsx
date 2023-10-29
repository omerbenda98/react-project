import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import useFileUpload from "../hooks/useFileUpload";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ROUTES from "../routes/ROUTES";
import validateProfileSchema from "../validation/profileEditValidation";
import UserAvatar from "../components/Navbar/NavProfile";
import useLoggedIn from "../hooks/useLoggedIn";
import useAdmin from "../hooks/useAdmin";
import useBiz from "../hooks/useBiz";
import "./pages_css/ProfilePage.css";

const ProfilePage = () => {
  const [inputState, setInputState] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [originalInputState, setOriginalInputState] = useState({});
  const [inputsErrorsState, setInputsErrorsState] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const loggedIn = useLoggedIn();
  const isAdmin = useAdmin();
  const isBiz = useBiz();

  const { preview, handleFileChange, handleUpload } = useFileUpload();

  const handleFileUpload = async () => {
    const newImageUrl = await handleUpload(setInputState, setUserInfo);

    return newImageUrl;
  };
  const handleImgChange = (event) => {
    handleFileChange(event);
  };

  const handleSaveProfile = async () => {
    try {
      const uploadedImageUrl = await handleFileUpload();

      const profileData = uploadedImageUrl
        ? { ...inputState, imageUrl: uploadedImageUrl }
        : inputState;

      const joiResponse = validateProfileSchema(profileData);
      setInputsErrorsState(joiResponse);

      if (joiResponse) {
        toast.error("oops");

        return;
      }

      const { data } = await axios.put("/users/userInfo", profileData);

      if (inputState.biz !== originalInputState.biz) {
        const newToken = data.token.token;
        console.log("new token: ", newToken);
        localStorage.setItem("token", newToken);
        loggedIn();
        isAdmin();
        isBiz();
      }
      const updatedUserData = data.user._doc;
      setOriginalInputState(updatedUserData);
      setInputState(updatedUserData);
      setEditMode(false);
      navigate(ROUTES.HOME);
    } catch (err) {
      console.log("error from axios", err.response.data);
    }
  };
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("/users/userInfo");
        delete data._id;
        delete data.isAdmin;
        setInputState(data);
        setUserInfo(data);
        setOriginalInputState(data);
      } catch (err) {
        console.log("error from axios", err.response.data);
      }
    };
    fetchProfile();
  }, []);

  const handleEditProfile = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setInputState(originalInputState);
    setEditMode(false);
  };

  const handleInputChange = (ev) => {
    let newInputState = { ...inputState };
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
    const joiResponse = validateProfileSchema(newInputState);
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
    <div className="profile-big-container">
      <div className="profile-container">
        {editMode ? (
          <>
            {preview ? (
              <img src={preview} alt="Profile Preview" className="user-img" />
            ) : !userInfo.imageUrl ? (
              <UserAvatar />
            ) : (
              <img
                src={userInfo.imageUrl}
                alt={`${userInfo.firstName} ${userInfo.lastName}`}
                className="user-img"
              />
            )}
            <Grid container spacing={3}>
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
                    {inputsErrorsState.middleName.map((item) => (
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
              <Grid item xs={6}>
                <div>
                  <p>Choose Profile picture</p>
                  <input type="file" onChange={handleImgChange} />
                </div>
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
            </Grid>

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSaveProfile}
              disabled={isDisabled}
            >
              SAVE
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleResetClick}
            >
              RESET
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleCancelEdit}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div>
              {!userInfo.imageUrl ? (
                <UserAvatar />
              ) : (
                <img
                  src={userInfo.imageUrl}
                  alt={`${userInfo.firstName} ${userInfo.lastName}`}
                  className="user-img"
                />
              )}
            </div>
            <Typography component="h1" variant="h5">
              Profile
            </Typography>
            <Box sx={{ p: 3, mt: 3, maxWidth: 400 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Personal Information
                </Typography>
                <Typography>
                  Name: {inputState.firstName} {inputState.lastName}
                </Typography>
                <Typography>Email: {inputState.email}</Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Account Information
                </Typography>

                <Typography>
                  Business Account: {inputState.biz ? "Yes" : "No"}
                </Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Address Information
                </Typography>
                <Typography>Country: {inputState.country}</Typography>
                <Typography>State: {inputState.state}</Typography>
                <Typography>City: {inputState.city}</Typography>
                <Typography>Street: {inputState.street}</Typography>
                <Typography>House Number: {inputState.houseNumber}</Typography>
                <Typography>Zip Code: {inputState.zipCode}</Typography>
              </Box>
              <Button variant="contained" onClick={handleEditProfile}>
                Edit
              </Button>
            </Box>
          </Box>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
