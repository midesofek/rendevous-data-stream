import React, { useEffect, useState } from "react";

async function convertCoordToAddress(coords) {
  const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

  const res = await fetch(
    `${BASE_URL}?latitude=${coords[0]}&longitude=${coords[1]}`
  );
  const data = await res.json();

  const { locality, city, countryCode, continent } = data;

  let cityNameData;

  if (!countryCode && !city && !continent) {
    cityNameData = "Unidentified Location!";
  } else {
    cityNameData = { locality, city, countryCode, continent };
  }

  return cityNameData;
}

export const IncomingStreams = function ({ messages }) {
  const [isClosed, setIsClosed] = useState(false);

  const toggleMessageWindow = () => {
    setIsClosed((prevState) => !prevState);
  };

  return (
    <div id="message--window">
      <div className="message-header">
        <h2>Incoming Positions</h2>
        <button
          className={`close-button toggle-message-button ${
            isClosed ? "show-search-icon remove-times-icon" : "show-times-icon"
          }`}
          onClick={toggleMessageWindow}
        >
          <i className="fa fa-search" aria-hidden="true"></i>
          <i className="fas fa-times" aria-hidden="true"></i>
        </button>
      </div>
      <div className={`${isClosed ? "" : "message-content"}`}>
        {messages.map((msg) => {
          return <Message msg={msg} />;
        })}
      </div>
    </div>
  );
};

function Message({ msg }) {
  const { data, time } = msg;
  const [cityData, setCityData] = useState("");

  useEffect(() => {
    async function convertCityData() {
      const cityRawData = await convertCoordToAddress(data);
      console.log(cityRawData);
      setCityData(cityRawData);
    }
    convertCityData();
  }, []);

  let msgText;

  const formattedTime = new Date(time).toLocaleString();

  if (cityData === "Unidentified Location!") {
    msgText = "Unidentified Location!";
  } else {
    const { locality, city, countryCode, continent } = cityData;
    msgText = `${locality}, ${city}, ${countryCode}, ${continent} at: ${formattedTime}`;
  }
  console.log("This is msgText: ", msgText);
  return (
    <div className="message-content">
      <p key={msg}>{msgText}</p>
    </div>
  );
}
