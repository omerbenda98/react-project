import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-router-dom";

import "./components_css/Footer.css";

const FooterComponent = () => {
  const [dogImages, setDogImages] = useState([]);

  useEffect(() => {
    // Fetch dog images from an API (e.g., Dog API)
    const fetchDogImages = async () => {
      try {
        const response = await fetch(
          "https://dog.ceo/api/breeds/image/random/10"
        );
        const data = await response.json();
        setDogImages(data.message);
      } catch (error) {
        console.error("Error fetching dog images:", error);
      }
    };

    fetchDogImages();
  }, []);

  return (
    <Box
      className="footer-container"
      sx={{ position: "relative", overflow: "hidden" }}
    >
      <div className="dog-carousel">
        {[...dogImages, ...dogImages].map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Dog ${index + 1}`}
            className="carousel-image"
          />
        ))}
      </div>
      <Box
        className="footer-content"
        sx={{ position: "relative", zIndex: 1, py: 10 }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
          <IconButton color="primary">
            <FacebookIcon />
          </IconButton>
          <IconButton color="primary" component="a" href="#" target="_blank">
            <InstagramIcon />
          </IconButton>
          <IconButton color="primary" component="a" href="#" target="_blank">
            <TwitterIcon />
          </IconButton>
          <IconButton color="primary" component="a" href="#" target="_blank">
            <LinkedInIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
          <Link to="/" className="footer-link">
            Home
          </Link>
          <Link to="/about" className="footer-link">
            About Us
          </Link>
          <Link to="/services" className="footer-link">
            Services
          </Link>
          <Link to="/contact" className="footer-link">
            Contact
          </Link>
        </Box>

        <Box align="center" color="text.secondary" sx={{ mb: 2 }}>
          For inquiries:{" "}
          <Typography component="span">omerbenda98@gmail.com</Typography>
        </Box>

        <Typography variant="body2" align="center" color="text.secondary">
          &copy; {new Date().getFullYear()} Omer Ben David. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default FooterComponent;
