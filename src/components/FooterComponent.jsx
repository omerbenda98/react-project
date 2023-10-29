import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import "./components_css/Footer.css";
import { Link } from "react-router-dom";

const FooterComponent = () => {
  return (
    <Box className="footer-container" sx={{ py: 10 }}>
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
        <Link href="#" color="inherit" variant="body2">
          Home
        </Link>
        <Link href="#" color="inherit" variant="body2">
          About Us
        </Link>
        <Link href="#" color="inherit" variant="body2">
          Services
        </Link>
        <Link href="#" color="inherit" variant="body2">
          Contact
        </Link>
      </Box>

      <Box align="center" color="text.secondary" sx={{ mb: 2 }}>
        For inquiries: <Typography>omerbenda98@gmail.com</Typography>
      </Box>

      <Typography variant="body2" align="center" color="text.secondary">
        &copy; {new Date().getFullYear()} Omer Ben David. All rights reserved.
      </Typography>
    </Box>
  );
};

export default FooterComponent;
