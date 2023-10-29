import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";
import "./components_css/CardComp.css";

const CardComp = ({ id, name, img, height, weight, lifeSpan }) => {
  const navigate = useNavigate();

  const handleSelectBreedBtnClick = async () => {
    navigate(`/breed/${id}`);
  };

  return (
    <div className="card">
      <div className="content">
        <div className="back">
          <div className="back-content">
            <strong className="badge">{name}</strong>
            <p>Life span: {lifeSpan}</p>
            <img src={img} alt="image" className="back-img"></img>
          </div>
        </div>
        <div className="front">
          <div className="img">
            <div className="circle"></div>
            <div className="circle" id="right"></div>
            <div className="circle" id="bottom"></div>
          </div>

          <div className="front-content">
            <img src={img} alt="image" className="breed-img"></img>
            <strong>{name}</strong>
            <div className="description">
              <small className="badge">
                weight in metric : {weight.metric} KG
              </small>

              <small className="badge">height in metric : {height} CM</small>
              <div className="button-group">
                <button onClick={handleSelectBreedBtnClick} className="seeMore">
                  See More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CardComp.propTypes = {
  id: propTypes.number.isRequired,
  name: propTypes.string.isRequired,
  img: propTypes.string.isRequired,
  height: propTypes.string.isRequired,
  weight: propTypes.shape({
    metric: propTypes.string.isRequired,
  }).isRequired,
  lifeSpan: propTypes.string.isRequired,
};

CardComp.defaultProps = {
  img: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
};

export default CardComp;
