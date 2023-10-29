import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./pages_css/AboutUsPage.css";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";

const AboutUsPage = () => {
  const navigate = useNavigate();
  const handleNavigate = (route) => {
    navigate(route);
  };
  const exampleImage =
    "https://images.unsplash.com/photo-1682001426601-c7fdc9ea5b4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60";

  return (
    <div className="about-container">
      <Box sx={{ py: 4, textAlign: "center" }} className="aboutUs-container">
        <Typography variant="h4" align="center" gutterBottom>
          About Us - Paws & Hearts Dog Adoption
        </Typography>

        <Typography variant="h5" gutterBottom>
          Our Mission
        </Typography>
        <Typography variant="body1" paragraph>
          At Paws & Hearts, our mission is simple but profound: to give every
          dog a loving home. We believe that every dog, regardless of age,
          breed, or size, deserves love, care, and a forever family.
        </Typography>

        <Typography variant="h5" gutterBottom>
          Our Vision
        </Typography>
        <Typography variant="body1" paragraph>
          To create a world where every dog has a home and to connect potential
          pet parents with their perfect furry companion.
        </Typography>

        <Typography variant="h5" gutterBottom>
          Why We Do What We Do
        </Typography>
        <Typography variant="body1" paragraph>
          We recognize the sheer number of dogs in shelters and on streets
          awaiting a loving home. Our platform aims to bridge the gap between
          these furry friends and those willing to provide them with a warm
          household.
        </Typography>

        <Typography variant="h5" gutterBottom>
          Stories of Love
        </Typography>
        <Typography variant="body1" paragraph>
          Over the years, thousands of dogs have found their forever homes
          through Paws & Hearts. Every adoption story is a testament to love,
          resilience, and the power of community. [Check out some of our
          favorite stories here!]
        </Typography>

        <Typography variant="h5" gutterBottom>
          Our Team
        </Typography>
        <Typography variant="body1" paragraph>
          Meet the dedicated team behind Paws & Hearts. From tech enthusiasts to
          dog lovers and veterinarians, our diverse team is united by a shared
          passion – ensuring every dog gets a shot at a better life. [Meet our
          team!]
        </Typography>

        <Typography variant="h5" gutterBottom>
          How You Can Help
        </Typography>
        <Typography variant="body1" paragraph>
          Apart from adopting, there are multiple ways to contribute to our
          cause. Whether it's by putting a dog up for adoption, volunteering, or
          making a donation, every gesture counts. If you aren't ready to adopt
          but still want to make a difference, consider donating. All proceeds
          go towards maintaining the platform and supporting dog shelters.
        </Typography>

        <Typography variant="h5" gutterBottom>
          Testimonials
        </Typography>
        <Typography variant="body1" paragraph>
          “Adopting Luna through Paws & Hearts was a breeze. She's added so much
          joy to our lives!” - Alexa M.
        </Typography>
        <Typography variant="body1" paragraph>
          “I had to move abroad and sadly couldn't take Max with me. Thanks to
          Paws & Hearts, Max found a new family in no time. The platform is a
          lifesaver!” - Jacob R.
        </Typography>

        <Typography variant="h5" gutterBottom>
          How It Works
        </Typography>
        <Typography variant="body1" paragraph>
          Our platform is designed with ease of use in mind. Here's how it
          functions:
        </Typography>
        <ul>
          <li onClick={() => handleNavigate(ROUTES.REGISTER)}>
            <Typography variant="body1">
              <strong>Register:</strong> Sign up as an adopter or someone
              looking to put a dog up for adoption.
            </Typography>
          </li>
          <li onClick={() => handleNavigate(ROUTES.CREATE)}>
            <Typography variant="body1">
              <strong>Create a Card:</strong> If you're putting up a dog for
              adoption, create a card with the dog's details and a lovely
              picture. This will be visible to potential adopters.
            </Typography>
          </li>
          <li onClick={() => handleNavigate(ROUTES.ADOPTION)}>
            <Typography variant="body1">
              <strong>Adoption Page:</strong> As an adopter, browse through the
              list of dogs available for adoption. Found your future furry
              friend? Click 'Adopt' to initiate the process.
            </Typography>
          </li>
          <li onClick={() => handleNavigate(ROUTES.ADOPTION)}>
            <Typography variant="body1">
              <strong>Chat:</strong> Once you click 'Adopt', you'll be directed
              to a chat room with the person who put the dog up for adoption.
              This ensures direct and quick communication.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Donations:</strong> If you're not ready to adopt, consider
              making a donation or exploring other dog charities listed on our
              platform.
            </Typography>
          </li>
        </ul>
      </Box>
    </div>
  );
};

export default AboutUsPage;
