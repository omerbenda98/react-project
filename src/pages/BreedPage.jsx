import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import "./pages_css/BreedPage.css";

function BreedPage() {
  const { breed } = useParams();
  const [breedInfo, setBreedInfo] = useState(null);
  const [breedImage, setBreedImage] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://api.thedogapi.com/v1/breeds/" + breed,
          {
            headers: {
              "x-api-key":
                "live_7npfrgJr5i4Fta8cIg9MxUAcZ0oo73XwuKcqrZr4d1dLEoKFJPS6TKVKJ70vIo8b",
            },
          }
        );
        const breedImage = await axios.get(
          "https://api.thedogapi.com/v1/images/" + data.reference_image_id,
          {
            headers: {
              "x-api-key":
                "live_7npfrgJr5i4Fta8cIg9MxUAcZ0oo73XwuKcqrZr4d1dLEoKFJPS6TKVKJ70vIo8b",
            },
          }
        );

        setBreedInfo(data);
        setBreedImage(breedImage);
      } catch (err) {
        console.log("err from axios", err);
      }
    })();
  }, [breed]);

  if (!breedInfo && !breedImage) {
    return <Loader />;
  }
  return (
    <div className="breed-big-container">
      <div className="breed-container">
        <h1 className="breed-title">Breed: {breedInfo.name}</h1>
        <img src={breedImage.data.url} alt={breedInfo.name} />
        <p className="breed-description">
          This is some information about the {breedInfo.name} breed.
        </p>
        <p>
          <strong>Bred for:</strong> {breedInfo.bred_for}
        </p>
        <p>
          <strong>Breed group:</strong> {breedInfo.breed_group}
        </p>
        <p>
          <strong>Origin:</strong> {breedInfo.origin}
        </p>
        <p>
          <strong>Height:</strong>{" "}
          {breedInfo.height &&
            `Imperial: ${breedInfo.height.imperial}, Metric: ${breedInfo.height.metric}`}
        </p>
        <p>
          <strong>Life span:</strong> {breedInfo.life_span}
        </p>
        <p>
          <strong>Temperament:</strong> {breedInfo.temperament}
        </p>
        <p>
          <strong>Weight:</strong>{" "}
          {breedInfo.weight &&
            `Imperial: ${breedInfo.weight.imperial}, Metric: ${breedInfo.weight.metric}`}
        </p>
      </div>
    </div>
  );
}

export default BreedPage;
