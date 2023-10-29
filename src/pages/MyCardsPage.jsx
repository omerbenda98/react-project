import AddCircleIcon from "@mui/icons-material/AddCircle";
import { IconButton } from "@mui/material";
import { Typography } from "@mui/material";
import "./pages_css/MyCardsPage.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import ROUTES from "../routes/ROUTES";
import "./pages_css/Neon.css";
import Loader from "../components/Loader";
import AdoptionCard from "../components/AdoptionCard";

const MyCardsPage = () => {
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/cards/my-cards");
        setUserData(data);
      } catch (err) {
        console.log("error from axios", err);
      }
    })();
  }, []);
  const onDelete = (id) => {
    setUserData((newCardsArr) => newCardsArr.filter((item) => item._id !== id));
  };
  const handleNavigate = () => {
    navigate(ROUTES.CREATE);
  };
  const getTokenId = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return false;
    }
    const payload = jwt_decode(token);

    const userId = payload._id;
    return userId;
  };

  if (!userData) {
    return <Loader />;
  }

  return (
    <div className="mycards-container">
      <Typography variant="h3" sx={{ textAlign: "center" }} className="neon">
        My Cards
      </Typography>
      <IconButton onClick={handleNavigate}>
        <AddCircleIcon
          color="success"
          sx={{
            fontSize: 80,
          }}
        />
        <Typography>Add New Card</Typography>
      </IconButton>
      {!userData === true ? (
        <Typography variant="h5" sx={{ textAlign: "center" }} className="neon">
          No cards created. Click add button below to add cards.
        </Typography>
      ) : (
        <div className="mycards-grid-container">
          {userData.map((item) => (
            <div key={item._id + Date.now()} className="mycards-grid-item">
              <AdoptionCard
                name={item.name}
                age={item.age}
                breed={item.breed}
                description={item.description}
                country={item.country}
                city={item.city}
                phone={item.phone}
                email={item.email}
                id={item._id}
                imgUrl={item.imageUrl}
                userId={item.user_id}
                tokenId={getTokenId()}
                onDelete={onDelete}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default MyCardsPage;
