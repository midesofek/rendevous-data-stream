import React, { useState } from "react";

export const IncomingStreams = function ({ messages }) {
  const [isClosed, setIsClosed] = useState(false);

  const toggleMessageWindow = () => {
    console.log("It works!");
    console.log(isClosed);
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
          console.log("THis is: ", msg);
          return <Message msg={msg} />;
        })}
      </div>
    </div>
  );
};

function Message({ msg }) {
  return (
    <div className="message-content">
      <p key={`index`}>{msg}</p>
    </div>
  );
}
