import React, { useState } from "react";
import { IconButton, Tooltip, Button, Dialog } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./components_css/AdoptionCard.css";
import propTypes from "prop-types";
import { apiBaseUrl } from "../config";
import AdoptionForm from "./AdoptionForm";
import jwt_decode from "jwt-decode";

const AdoptionCard = ({
  name,
  age,
  breed,
  country,
  city,
  phone,
  email,
  id,
  imgUrl,
  userId,
  tokenId,
  onDelete,
}) => {
  const [openForm, setOpenForm] = useState(false);
  const isAdmin = useSelector((bigPie) => bigPie.authSlice.isAdmin);
  const isBiz = useSelector((bigPie) => bigPie.authSlice.isBiz);
  const isLoggedIn = useSelector((bigPie) => bigPie.authSlice.isLoggedIn);
  const navigate = useNavigate();

  const handleAdoptClick = () => {
    if (isBiz) {
      navigate(`/chats/${userId}/${tokenId}`);
    } else {
      navigate(`/chats/${tokenId}/${userId}`);
    }
  };

  const cardOwnerLayout = () => {
    return userId === tokenId;
  };

  const handleEditBtnClick = () => {
    navigate(`/edit/${id}`);
  };

  const handleDeleteBtnClick = async (id) => {
    try {
      await axios.delete(`${apiBaseUrl}/cards/${id}`);
      onDelete(id);
      toast.success("Card Deleted");
    } catch (err) {
      toast.error("Error, can delete card");
      console.log("error when deleting", err.response.data);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      // Get the current user's ID from localStorage
      const token = localStorage.getItem("token");
      const payload = jwt_decode(token);
      const currentUserId = payload._id;

      // Prepare the card data object
      const cardData = {
        name, // from props
        breed, // from props
        age, // from props
        imgUrl, // from props
      };

      // Prepare the request body
      const requestBody = {
        formData: {
          ...formData,
          userId: currentUserId, // Add the current user's ID to formData
          firstName: formData.firstName,
          lastName: formData.lastName,
        },
        cardOwnerId: userId, // from props (original owner's ID)
        cardId: id, // from props (the dog/card ID)
        cardData: cardData, // the card information
      };

      const response = await axios.post(
        `${apiBaseUrl}/users/submit-adoption`,
        requestBody
      );

      setOpenForm(false);
      toast.success("Adoption application submitted successfully!");
    } catch (error) {
      console.error("Error submitting adoption application:", error);
      toast.error(
        error.response?.data?.message || "Failed to submit adoption application"
      );
    }
  };

  return (
    <div className="adoptionCard">
      <div>
        <img src={imgUrl} alt={breed} className="cardImg"></img>
      </div>
      <div className="cardTop">
        <div>
          <span className="cardName">My Name : {name}</span>
          <p className="cardDescription">My Age : {age}</p>
          <p className="cardDescription"> My Breed : {breed}</p>
        </div>
        <div>
          <h6 className="cardHeaders">Where Do I Live :</h6>
          <p className="cardDescription">Country : {country}</p>
          <p className="cardDescription">City : {city}</p>
        </div>
      </div>
      <h6 className="cardHeaders">Contact Information :</h6>
      <p className="cardDescription">Phone : {phone}</p>
      <p className="cardDescription">Email : {email}</p>

      <div className="cardButtons">
        {(isBiz || isAdmin) && (
          <Tooltip title="Delete">
            <IconButton
              onClick={() => handleDeleteBtnClick(id)}
              style={{ color: "lightgray" }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
        {cardOwnerLayout() && (
          <Tooltip title="Edit">
            <IconButton
              onClick={handleEditBtnClick}
              style={{ color: "lightgray" }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
      {isLoggedIn ? (
        userId !== tokenId ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              marginTop: "1rem",
            }}
          >
            <button onClick={handleAdoptClick} className="adoptBtn">
              ADOPT!
            </button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenForm(true)}
              fullWidth
              sx={{
                maxWidth: "200px", // Limit the width of the button
                mt: 1,
              }}
            >
              Submit Adoption Form
            </Button>
            <Dialog open={openForm} onClose={() => setOpenForm(false)}>
              <AdoptionForm
                onSubmit={handleFormSubmit}
                onCancel={() => setOpenForm(false)}
              />
            </Dialog>
          </div>
        ) : null
      ) : (
        <p>Must Be Registered To Adopt!</p>
      )}
    </div>
  );
};

AdoptionCard.propTypes = {
  id: propTypes.string,
  name: propTypes.string.isRequired,
  age: propTypes.string.isRequired,
  breed: propTypes.string,
  country: propTypes.string.isRequired,
  city: propTypes.string.isRequired,
  phone: propTypes.string.isRequired,
  onDelete: propTypes.func,
  imgUrl: propTypes.any,
  email: propTypes.string.isRequired,
};

export default AdoptionCard;
