import React, { useState, useEffect } from "react";
import { RENDEVOUS_DEFAULT_STREAMID } from "../config";

// 0x1339514086fc15c5e38af4e0407c469ca3911992/user-location-data-stream

export const Sidebar = ({ onAddNewMessages, userCoords }) => {
  const [isSidebarHidden, setIsSidebarHidden] = useState(true);

  const [streamId, setStreamId] = useState("");

  async function resendPreviousMessages(id, streamr) {
    return streamr.resend(
      id,
      {
        // from: {
        //   timestamp: Date.now() - 1000 * 60 * 30, // 30 minutes ago
        // },
        last: 10,
      },
      (data, metadata) => {
        const timeReceived = new Date(metadata.timestamp).toISOString();

        const newMessage = `${data.message} at: ${timeReceived}`;
        onAddNewMessages(newMessage);
        console.log(newMessage);
      }
    );
  }

  const subscribe = async (id) => {
    // Authenticate user -- change 'client' to "streamr"
    const streamr = new StreamrClient({
      auth: { ethereum: window.ethereum },
    });

    await resendPreviousMessages(id, streamr);
    streamr.subscribe(id, (data, metadata) => {
      const timeReceived = new Date(metadata.timestamp).toISOString();

      const newMessage = `${data.message} at: ${timeReceived}`;
      onAddNewMessages(newMessage);
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

  const handlePublishStream = async (id) => {
    try {
      console.log("Publishing....");

      const streamr = new StreamrClient({
        auth: { ethereum: window.ethereum },
      });

      const data = {
        message: userCoords,
      };

      await streamr.publish(id, data, {
        timestamp: new Date(),
      });
      console.log("Publish successful");
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleJoinTestStream = () => {
    console.log("Test Stream");
    subscribe(RENDEVOUS_DEFAULT_STREAMID);
  };

  const handleUnsubscribe = async () => {
    try {
      console.log("Unsubscribe works");
      await streamr.unsubscribe();
      console.log("You have successfully unsubscribed");
    } catch (err) {
      console.log(err.message, "Failed to Unsubscribe!");
    }
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
            <button
              className="publish--stream"
              onClick={() => handlePublishStream(streamId)}
            >
              Share Your Position
              {/* <!-- <i className="fa fa-map-marker" aria-hidden="true"></i> --> */}
            </button>
          </div>
          <div className="form__row form__row-inline">
            <button id="test-data-stream" onClick={handleJoinTestStream}>
              Test Data Stream
              <i className="fa fa-database" aria-hidden="true"></i>
            </button>
            <button
              id="button-unsubscribe"
              onClick={() => handleUnsubscribe(streamId)}
            >
              Unsubscribe Stream
            </button>
            {/* <button id="button-stop-sharing">Stop Sharing Data</button> */}
          </div>

          {/* <div className="form__row form__row-inline">
            <button id="button-unsubscribe" onClick={handleUnsubscribe}>
              Unsubscribe
            </button> 
          </div>*/}
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
