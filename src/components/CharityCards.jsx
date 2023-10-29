import React from "react";
import "./components_css/CharityCards.css";
import { Link } from "react-router-dom";
import "../pages/pages_css/Neon.css";

const CharityCards = ({ name, country, description, url, style }) => {
  return (
    <div className="charity-card" style={style}>
      <div className="charity-card-content neon">
        <p className="charity-card-title">{name}</p>
        <p className="charity-card-para">{description}</p>
        <p className="charity-card-para">Located in: {country}</p>
        <Link to={url} className="charity-button type1">
          <span className="charity-btn-txt">Visit Website</span>
        </Link>
      </div>
    </div>
  );
};

export default CharityCards;
