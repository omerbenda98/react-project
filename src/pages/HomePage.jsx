import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useQueryParams from "../hooks/useQueryParams";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import Typography from "@mui/material/Typography";
import Navbar from "../components/Navbar/Navbar";
import "./pages_css/Neon.css";
import "./pages_css/Homepage.css";
import CardComp from "../components/CardComp";
import Loader from "../components/Loader";
import DisplayControlBar from "../components/DisplayControlBar";
import ListComponent from "../components/ListComponent";
import CarouselComponent from "../components/CarouselComponent";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardsArr, setCardsArr] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [selectedCard, setSelectedCard] = useState(null);
  const [displayType, setDisplayType] = useState("card");
  const navigate = useNavigate();
  const [backgroundImages, setBackgroundImages] = useState([]);

  let qparams = useQueryParams();

  const isBiz = useSelector((bigPie) => bigPie.authSlice.isBiz);
  const isAdmin = useSelector((bigPie) => bigPie.authSlice.isAdmin);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cardsArr
    ? cardsArr.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const totalItems = cardsArr ? cardsArr.length : 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // retrieving dog breeds from external api
  useEffect(() => {
    axios
      .get("https://api.thedogapi.com/v1/breeds", {
        headers: {
          "x-api-key":
            "live_1q9YlMXuO0F09aHtY4RAbIy2qYofCpmrSt7hbvRjelw6YX4XGsEFtdXP8vVIf9O3",
        },
      })
      .then(({ data }) => {
        setOriginalCardsArr(data);
        setCardsArr(data);
        filterFunc();
      })
      .catch((err) => {
        console.log("err from axios", err);
        toast.error("Error fetching data");
      });
  }, []);

  // New useEffect for fetching background images
  useEffect(() => {
    const fetchBackgroundImages = async () => {
      try {
        const response = await axios.get(
          "https://api.thedogapi.com/v1/images/search",
          {
            params: { limit: 10, size: "full" },
            headers: {
              "x-api-key":
                "live_1q9YlMXuO0F09aHtY4RAbIy2qYofCpmrSt7hbvRjelw6YX4XGsEFtdXP8vVIf9O3",
            },
          }
        );
        setBackgroundImages(response.data.map((img) => img.url));
      } catch (err) {
        console.log("Error fetching background images", err);
        toast.error("Error fetching background images");
      }
    };

    fetchBackgroundImages();
  }, []);

  const getTokenId = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return false;
    }
    const payload = jwt_decode(token);
    const userId = payload.id;
    return userId;
  };
  const onDelete = (id) => {
    setCardsArr((newCardsArr) => newCardsArr.filter((item) => item.id !== id));
  };
  const seeMore = (id) => {
    const selectedBreed = (newCardsArr) =>
      newCardsArr.filter((item) => item.id === id);
    if (!selectedBreed) {
      toast.error("cannot find breed");
    } else {
      navigate(`/breed/${id}`);
    }
  };

  const filterFunc = () => {
    const filter = (qparams.filter || "").toLowerCase();
    if (originalCardsArr) {
      setCardsArr(
        originalCardsArr.filter((card) =>
          card.name.toLowerCase().startsWith(filter)
        )
      );
    }
  };
  useEffect(() => {
    filterFunc();
  }, [qparams.filter, originalCardsArr]);
  if (!cardsArr) {
    return <Loader />;
  }

  return (
    <Box className="home-bg">
      <Box className="homeImg">
        <div className="background-carousel">
          {backgroundImages.concat(backgroundImages).map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Dog ${index + 1}`}
              className="carousel-image"
            />
          ))}
        </div>
        <div className="content-overlay">
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography className="neon" variant="h2">
              Welcome to Paws & Hearts!!!!!!!!!!
            </Typography>
            <Typography
              variant="h5"
              component="h2"
              className="neon"
              sx={{ mt: 2, mb: 2, color: "white" }}
            >
              Explore and discover different dog breeds
            </Typography>
            <Typography
              variant="h5"
              component="h2"
              className="neon"
              sx={{ mt: 2, mb: 2, color: "white" }}
            >
              find a dog for adoption and give him a warm new home
            </Typography>
          </Box>
          <Box className="navbar-container">
            <Navbar />
          </Box>
        </div>
      </Box>
      <Box sx={{ mt: 2 }}>
        <DisplayControlBar setDisplayType={setDisplayType} />
      </Box>
      <br />
      <Grid
        container
        spacing={6}
        sx={{
          ml: 10,
          mt: 3,
        }}
        width={"90%"}
      >
        {displayType === "slide" ? (
          <CarouselComponent items={cardsArr} seeMore={seeMore} />
        ) : (
          currentItems.map((item) => {
            switch (displayType) {
              case "list":
                return (
                  <ListComponent
                    key={item.id}
                    item={item}
                    id={item.id}
                    name={item.name}
                    img={item.image ? item.image.url : ""}
                    height={item.height.metric}
                    weight={item.weight}
                    lifeSpan={item.life_span}
                    origin={item.origin}
                    canEdit={isBiz || isAdmin}
                    cardsArr={cardsArr}
                    userId={item.userid}
                    tokenId={getTokenId()}
                    seeMore={seeMore}
                    onClick={() => setSelectedCard(item)}
                    onDelete={onDelete}
                  />
                );
              case "card":
              default:
                return (
                  <Grid
                    item
                    xs={10}
                    md={6}
                    lg={4}
                    key={item.id + Date.now()}
                    className="card-grid"
                    justify="center"
                  >
                    <CardComp
                      id={item.id}
                      name={item.name}
                      img={item.image ? item.image.url : ""}
                      height={item.height.metric}
                      weight={item.weight}
                      lifeSpan={item.life_span}
                      origin={item.origin}
                      canEdit={isBiz || isAdmin}
                      cardsArr={cardsArr}
                      display="flex"
                      justifyContent="center"
                      userId={item.userid}
                      tokenId={getTokenId()}
                      seeMore={seeMore}
                      onClick={() => setSelectedCard(item)}
                      onDelete={onDelete}
                    />
                  </Grid>
                );
            }
          })
        )}
      </Grid>
      {displayType !== "slide" && (
        <Box className="home-pages-buttons" mt={3}>
          <button onClick={prevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <Typography mx={2} className="neon">
            Page {currentPage} of {totalPages}
          </Typography>
          <button onClick={nextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
