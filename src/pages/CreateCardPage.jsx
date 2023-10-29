import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";
import validateCreateSchema from "../validation/createValidation";
import Loader from "../components/Loader";
import useFileUpload from "../hooks/useFileUpload";
import UserAvatar from "../components/Navbar/NavProfile";
import "./pages_css/createCard.css";

const CreateCardPage = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [inputState, setInputState] = useState({
    name: "",
    age: "",
    breed: "",
    description: "",
    country: "",
    city: "",
    phone: "",
    email: "",
    imageUrl: "",
  });

  const [inputsErrorsState, setInputsErrorsState] = useState({});
  const navigate = useNavigate();

  const { preview, handleFileChange, handleUpload } = useFileUpload();

  const handleFileUpload = async () => {
    try {
      const newImageUrl = await handleUpload(setInputState);
      if (newImageUrl) {
        setInputState((prev) => ({ ...prev, imageUrl: newImageUrl }));
      }
      URL.revokeObjectURL(preview);
      return newImageUrl;
    } catch (error) {
      console.error("File upload failed:", error);
    }
  };

  const handleImgChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setInputState((prev) => ({ ...prev, imageUrl: url }));
    }
    handleFileChange(event);
  };

  const handleSaveBtnClick = async (ev) => {
    try {
      const joiResponse = validateCreateSchema(inputState);
      setInputsErrorsState(joiResponse);
      if (!joiResponse) {
        inputState.imageUrl = await handleFileUpload();

        await axios.post("/cards", inputState);

        navigate(ROUTES.HOME);
        toast.success("card added successfully");
      }
    } catch (err) {
      console.log("err", err);
      toast.error("Error, cannot add card");
    }
  };

  const handleCancelBtnClick = (ev) => {
    navigate(ROUTES.HOME);
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;

    setInputState(newInputState);
    const joiResponse = validateCreateSchema(newInputState);

    if (!joiResponse) {
      setIsDisabled(false);
      setInputsErrorsState(null);
    } else {
      setInputsErrorsState(joiResponse);
      setIsDisabled(true);
    }
  };
  const handleResetClick = (ev) => {
    setInputState({
      name: "",
      age: "",
      breed: "",
      description: "",
      country: "",
      city: "",
      phone: "",
      email: "",
      imageUrl: "",
    });
    setInputsErrorsState(null);
  };
  if (!inputState) {
    return <Loader />;
  }

  return (
    <div className="create-big-container">
      <div component="main" className="create-container">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <EditIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create new card
          </Typography>
          {preview ? (
            <img src={preview} alt="Profile Preview" className="displayImg" />
          ) : (
            <UserAvatar />
          )}
          <Box component="div" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  value={inputState.name}
                  onChange={handleInputChange}
                />
                {inputsErrorsState && inputsErrorsState.name && (
                  <Alert severity="warning">
                    {inputsErrorsState.name.map((item) => (
                      <div key={"name-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="age"
                  label="Age"
                  type="text"
                  id="age"
                  autoComplete="age"
                  value={inputState.age}
                  onChange={handleInputChange}
                />
                {inputsErrorsState && inputsErrorsState.age && (
                  <Alert severity="warning">
                    {inputsErrorsState.age.map((item) => (
                      <div key={"subTitle-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="breed"
                  label="Breed"
                  name="breed"
                  autoComplete="breed"
                  value={inputState.breed ? inputState.breed : ""}
                  onChange={handleInputChange}
                />
                {inputsErrorsState && inputsErrorsState.breed && (
                  <Alert severity="warning">
                    {inputsErrorsState.breed.map((item) => (
                      <div key={"state-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="description"
                  label="Description"
                  id="description"
                  autoComplete="description"
                  value={inputState.description}
                  onChange={handleInputChange}
                />
                {inputsErrorsState && inputsErrorsState.description && (
                  <Alert severity="warning">
                    {inputsErrorsState.description.map((item) => (
                      <div key={"description-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="country"
                  label="Country"
                  name="country"
                  autoComplete="country"
                  value={inputState.country ? inputState.country : ""}
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
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  autoComplete="city"
                  value={inputState.city ? inputState.city : ""}
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

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phone"
                  label="Phone"
                  id="phone"
                  autoComplete="phone"
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="email"
                  label="Email"
                  id="email"
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
                <Grid item xs={6}>
                  <div>
                    <p>Choose Profile picture</p>
                    <input type="file" onChange={handleImgChange} />
                  </div>
                </Grid>
              </Grid>

              <Grid item xs={4}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  color="success"
                  onClick={handleSaveBtnClick}
                  disabled={isDisabled}
                >
                  Save
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleResetClick}
                >
                  reset
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleCancelBtnClick}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    </div>
  );
};
export default CreateCardPage;
