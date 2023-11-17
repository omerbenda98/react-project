import React, { useState } from "react";
import "./pages_css/DonationPage.css";
import CharityCards from "../components/CharityCards";

// Each charity is an array: [name, country, description]
const charities = [
  [
    "Soi Dog Foundation",
    "Thailand",
    "Soi Dog Foundation (Soi Dog) was established in 2003 in Phuket, Thailand, to help the street dogs and cats who had no-one else to care for them. Over 70,000 strays roamed the island, with the numbers growing alarmingly due to a lack of spay and neuter programmes to control the population. Soi Dog was created to provide a humane and sustainable solution to managing the stray population and to address their medical needs. Funding then, as it does now, came entirely from individuals who shared, and continue to share, the vision of our founders.",
    "https://www.soidog.org/",
    "./charities-images/ASPCA.jpg",
  ],
  [
    "ASPCA",
    "Italy",
    "The American Society for the Prevention of Cruelty to Animals® (ASPCA®) was the first humane society to be established in North America and is, today, one of the largest in the world. Our organization was founded on the belief that animals are entitled to kind and respectful treatment at the hands of humans and must be protected under the law. Headquartered in New York City, the ASPCA maintains a strong local presence, and with programs that extend our anti-cruelty mission across the country, we are recognized as a national animal welfare organization.”",
    "https://www.aspca.org/",
    "./charities-images/soidog.jpg",
  ],
  [
    "AllDogsMatter",
    "UK",
    "All Dogs Matter is a dog rescue and rehoming charity working in and around London to transform the lives of unwanted and abandoned dogs. We also rehome dogs in need from overseas. In 2022 All Dogs Matter rescued and rehomed 349 dogs with new owners.",
    "https://alldogsmatter.co.uk/",
    "./charities-images/allDogsMatter.jpg",
  ],
];

function DonationPage() {
  const [donationAmount, setDonationAmount] = useState(0);

  const handlePresetAmountClick = (amount) => {
    setDonationAmount(amount);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <div className="donation-container">
      <div className="top-container">
        <img src="./petanimation2.png" className="pet-animation" />
        <div className="donation-form">
          <h2>Donate to our cause</h2>
          <p>Select a donation amount:</p>
          <button onClick={() => handlePresetAmountClick(5)}>5$</button>
          <button onClick={() => handlePresetAmountClick(10)}>10$</button>
          <button onClick={() => handlePresetAmountClick(15)}>15$</button>
          <input
            type="number"
            placeholder="Custom amount"
            value={donationAmount}
            onChange={(e) => setDonationAmount(Number(e.target.value))}
          />

          <form onSubmit={handleSubmit}>
            <button type="submit" className="submit">
              Donate {donationAmount}$
            </button>
          </form>
        </div>
        <img src="./petanimation.png" className="pet-animation" />
      </div>
      <div className="charity-cards-container">
        {charities.map((charity, index) => (
          <CharityCards
            key={index}
            name={charity[0]}
            country={charity[1]}
            description={charity[2]}
            url={charity[3]}
            style={{
              backgroundImage: `url(${charity[4]})`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default DonationPage;
