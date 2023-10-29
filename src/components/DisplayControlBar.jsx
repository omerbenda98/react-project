import "./components_css/DisplayControlBar.css";
import StyleIcon from "@mui/icons-material/Style";
import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";

const DisplayControlBar = ({ setDisplayType }) => {
  return (
    <div className="display-buttons">
      <button onClick={() => setDisplayType("card")}>
        <StyleIcon />
      </button>
      <button
        onClick={() => {
          console.log("List button clicked!");
          setDisplayType("list");
        }}
      >
        <ViewAgendaIcon />
      </button>
      <button onClick={() => setDisplayType("slide")} className="slide-btn">
        <ViewCarouselIcon />
      </button>
    </div>
  );
};

export default DisplayControlBar;
