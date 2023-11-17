import "./components_css/ListComponent.css";
import "../pages/pages_css/Neon.css";
import { useNavigate } from "react-router-dom";

const ListComponent = ({ name, img, height, weight, lifeSpan, origin, id }) => {
  const navigate = useNavigate();

  const handleSelectBreedBtnClick = async () => {
    navigate(`/breed/${id}`);
  };
  return (
    <div className="list-item">
      <span className="list-title neon">Breed : {name}</span>
      <div className="icon">
        <img src={img} alt={name} className="list-img"></img>
        {origin && <div className="origin neon">origin : {origin}</div>}
      </div>
      <div className="list-content">
        <div className="list-desc">
          <div className="info-item">height : {height} CM </div>
          <div className="info-item">weight : {weight.metric} </div>
          <div className="info-item">lifeSpan : {lifeSpan}</div>
        </div>
      </div>

      <div className="list-end">
        <button className="see-more" onClick={handleSelectBreedBtnClick}>
          See More About {name}
        </button>
      </div>
    </div>
  );
};

export default ListComponent;
