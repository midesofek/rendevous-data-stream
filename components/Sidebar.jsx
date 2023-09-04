import React, { useState, useEffect } from "react";
// import { StreamrClient } from "streamr-client";

// 0x1339514086fc15c5e38af4e0407c469ca3911992/user-location-data-stream

export const Sidebar = () => {
  const [isSidebarHidden, setIsSidebarHidden] = useState(true);
  const [streamId, setStreamId] = useState("");
  const [messages, setMessages] = useState([]);
  const [position, setPosition] = useState("");

  const subscribe = (id) => {
    // Authenticate user -- change 'client' to "streamr"
    const streamr = new StreamrClient({
      auth: { ethereum: window.ethereum },
    });

    streamr.subscribe(id, (data, metadata) => {
      // resendPreviousMessages();
      const timeReceived = new Date(metadata.timestamp).toISOString();

      const newMessage = `${data.message} at: ${timeReceived}`;
      console.log(newMessage);

      // Update the messages state with the new message
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Update the position state
      setPosition(data.message);
      console.log(messages, position);

      // renderLocationMarker(position, metadata.publisherId);
      return (
        <div>
          {/* Render location marker or other components */}
          {/* Example: <LocationMarker position={position} /> */}

          <div className="message-content">
            {messages.map((message, index) => (
              <p key={index}>{message}</p>
            ))}
          </div>
        </div>
      );
    });
  };

  const toggleSideBar = () => {
    setIsSidebarHidden((prevState) => !prevState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit works!");
    console.log("id is: ", streamId);
    subscribe(streamId);
  };

  const handleJoinStream = (id) => {
    console.log("Join Works");
    ("Joining Stream.......");
    subscribe(id);
  };

  const handlePublishStream = () => {
    console.log("Share Works");
  };

  const handleJoinTestStream = () => {
    console.log("Test Stream");
  };

  const handleUnsubscribe = () => {
    console.log("Unsubscribe works");
  };

  const handleCreateStream = (e) => {
    e.preventDefault();
    window.open("https://streamr.network/hub/streams/new", "_blank");
  };

  return (
    <>
      <button className="toggle-sidebar-button" onClick={toggleSideBar}>
        <i className="fas fa-bars"></i>
      </button>
      <div className={`sidebar ${isSidebarHidden ? "sidebar-hidden" : ""}`}>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__row form__row-top">
            <input
              type="text"
              name=""
              id="input--streamId"
              placeholder="Enter Stream ID"
              // value={streamId}
              onChange={(e) => {
                console.log(e.target.value);
                setStreamId(e.target.value);
                console.log("Subscribing to stream");
                console.log("Stream id is: ", streamId);
              }}
            />
          </div>
        </form>
        <asides className="form">
          <div className="form__row form__row-inline">
            <button
              id="join-data-stream"
              onClick={() => handleJoinStream(streamId)}
            >
              Join Data Stream
              <i className="fa fa-database" aria-hidden="true"></i>
            </button>
            <button className="publish--stream" onClick={handlePublishStream}>
              Share Your Position
              {/* <!-- <i className="fa fa-map-marker" aria-hidden="true"></i> --> */}
            </button>
          </div>
          <div className="form__row form__row-inline">
            <button id="test-data-stream" onClick={handleJoinTestStream}>
              Test Data Stream
              <i className="fa fa-database" aria-hidden="true"></i>
            </button>
            <button id="button-stop-sharing">Stop Sharing Data</button>
          </div>

          <div className="form__row form__row-inline">
            <button id="button-unsubscribe" onClick={handleUnsubscribe}>
              Unsubscribe
            </button>
          </div>
          <button
            className="form__btn"
            id="create-new-stream"
            onClick={handleCreateStream}
          >
            +Create New Stream
            <i className="fa fa-external-link" aria-hidden="true"></i>
          </button>
        </asides>

        <p className="copyright">
          &copy; Mide. Powered By
          <a
            className="twitter-link"
            target="_blank"
            href="https://streamr.network/"
          >
            Streamr Network
          </a>
          .<br />
          <a href="https://github.com/midesofek" target="_blank">
            <img
              className="github-logo"
              src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
              alt="GitHub Logo"
            />
          </a>
        </p>
      </div>
    </>
  );
};
