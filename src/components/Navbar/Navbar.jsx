import React, { Fragment } from "react";
import "./navbar_css/Navbar.css";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import { useSelector } from "react-redux";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((bigState) => bigState.authSlice.isLoggedIn);

  const handleAdoptionClick = () => {
    navigate(ROUTES.ADOPTION);
  };
  const handleAboutPageClick = () => {
    navigate(ROUTES.ABOUT);
  };
  const handleDonationsClick = () => {
    navigate(ROUTES.DONATION);
  };

  const handleRegisterClick = () => {
    navigate(ROUTES.REGISTER);
  };
  const handleLoginClick = () => {
    navigate(ROUTES.LOGIN);
  };

  return (
    <Fragment>
      <div className="container">
        <div className="all">
          <div className="lefter" onClick={handleAboutPageClick}>
            <div className="text">About Us</div>
          </div>
          {!isLoggedIn && (
            <Fragment>
              <div className="left" onClick={handleLoginClick}>
                <div className="text">Login</div>
              </div>
            </Fragment>
          )}

          <div className="center" onClick={handleDonationsClick}>
            <div className="explainer">
              <span>Explore</span>
            </div>
            <div className="text">Donate To Charity</div>
          </div>

          {!isLoggedIn && (
            <Fragment>
              <div className="right" onClick={handleRegisterClick}>
                <div className="text">Register</div>
              </div>
            </Fragment>
          )}
          <div className="righter" onClick={handleAdoptionClick}>
            <div className="text">Adoption</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Navbar;
