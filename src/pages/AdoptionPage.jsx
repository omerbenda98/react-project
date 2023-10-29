import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import Typography from "@mui/material/Typography";
import "./pages_css/Neon.css";
import "./pages_css/AdoptionPage.css";
import Loader from "../components/Loader";
import AdoptionCard from "../components/AdoptionCard";

const AdoptionPage = () => {
  const [cardsArr, setCardsArr] = useState(null);

  useEffect(() => {
    axios
      .get("/cards/cards")
      .then(({ data }) => {
        setCardsArr(data);
      })
      .catch((err) => {
        console.log("err from axios", err);
        toast.error("Oops");
      });
  }, []);
  const getTokenId = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return false;
    }
    const payload = jwt_decode(token);
    const userId = payload._id;
    return userId;
  };
  const onDelete = (id) => {
    setCardsArr((newCardsArr) => newCardsArr.filter((item) => item.id !== id));
  };

  if (!cardsArr) {
    return <Loader />;
  }

  return (
    <div className="adoption-container">
      <div className="AdoptionPageHeader">
        <Typography className="neon" variant="h2">
          Welcome to the adoption page!
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          className="neon"
          sx={{ mt: 2, mb: 2, color: "white" }}
        >
          Here you can Explore and find a dog to adopt.
        </Typography>
      </div>

      <div className="adoption-grid-container">
        {cardsArr.map((item) => (
          <div key={item._id + Date.now()} className="adoption-grid-item">
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
              tokenId={getTokenId()}
              userId={item.user_id}
              onDelete={onDelete}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdoptionPage;
