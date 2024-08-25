import React from "react";
import { useNavigate } from "react-router-dom";
import "./components_css/ListComponent.css";
import "../pages/pages_css/Neon.css";

const ListComponent = ({ name, img, height, weight, lifeSpan, origin, id }) => {
  const navigate = useNavigate();

  const handleSelectBreedBtnClick = () => navigate(`/breed/${id}`);

  return (
    <div className="list-item">
      <div className="list-header">
        <h2 className="list-title neon">Breed: {name}</h2>
        {origin && <p className="origin neon">Origin: {origin}</p>}
      </div>

      <div className="list-body">
        <div className="list-image">
          <img src={img} alt={name} className="list-img" />
        </div>

        <div className="list-info">
          <div className="info-item">
            <span className="info-label">Height:</span>
            <span className="info-value">{height} cm</span>
          </div>
          <div className="info-item">
            <span className="info-label">Weight:</span>
            <span className="info-value">{weight.metric}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Life Span:</span>
            <span className="info-value">{lifeSpan}</span>
          </div>
        </div>
      </div>

      <div className="list-footer">
        <button className="see-more-btn" onClick={handleSelectBreedBtnClick}>
          See More About {name}
        </button>
      </div>
    </div>
  );
};

export default ListComponent;
