import { IconButton, Tooltip } from "@mui/material";
import { Fragment } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./components_css/AdoptionCard.css";
import propTypes from "prop-types";

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
    if (userId === tokenId) {
      return true;
    } else {
      return false;
    }
  };

  const handleEditBtnClick = () => {
    navigate(`/edit/${id}`);
  };

  const handleDeleteBtnClick = async (id) => {
    try {
      await axios.delete("/cards/" + id);
      onDelete(id);
      toast.success("Card Deleted");
    } catch (err) {
      toast.error("Error, can delete card");
      console.log("error when deleting", err.response.data);
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
          <Fragment>
            <Tooltip title="Edit">
              <IconButton
                onClick={handleEditBtnClick}
                style={{ color: "lightgray" }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Fragment>
        )}
      </div>
      {isLoggedIn ? (
        userId !== tokenId ? (
          <button onClick={handleAdoptClick} className="adoptBtn">
            ADOPT!
          </button>
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
