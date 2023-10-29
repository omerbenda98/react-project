import { NavLink } from "react-router-dom";
import "./navbar_css/NavBtn.css";
const NavLinkComponent = ({ url, label, onClick }) => {
  return (
    <NavLink to={url} onClick={onClick} className="Btn">
      {({ isActive }) => (
        <button className="btn" type="button">
          <strong className="label">{label}</strong>
          <div id="container-stars">
            <div id="stars"></div>
          </div>

          <div id="glow">
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </button>
      )}
    </NavLink>
  );
};

export default NavLinkComponent;
