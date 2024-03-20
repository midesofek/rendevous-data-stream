import React, { useState, useEffect } from "react";
// import renderLocationMarker from "./utils/renderMarker";
import { RENDEVOUS_DEFAULT_STREAMID } from "../config";
import { toast } from "react-toastify";

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

        // const newMessage = `${data.message} at: ${timeReceived}`;
        const newMessage = { data: data.message, time: timeReceived };
        onAddNewMessages(newMessage);
      }
    );
  }

  async function renderLocationMarker(position) {
    L.marker(position)
      .addTo(map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
        })
      )
      .setPopupContent(`You are here`)
      .openPopup(); // Display Marker
  }

  const subscribe = async (id) => {
    try {
      // Authenticate user -- change 'client' to "streamr"
      const streamr = new StreamrClient({
        auth: { ethereum: window.ethereum },
      });

      await resendPreviousMessages(id, streamr);
      streamr.subscribe(id, (data, metadata) => {
        const timeReceived = new Date(metadata.timestamp).toISOString();

        const newMessage = `${data.message} at: ${timeReceived}`;
        onAddNewMessages(newMessage);
        // onSetLocationMarker(data.message);
      });
      toast.success("Subscription successful!");
    } catch (err) {
      console.log(err.message);
      toast.error(`Failed! Reason: ${err.message}`);
    }
  };

  const toggleSideBar = () => {
    setIsSidebarHidden((prevState) => !prevState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    subscribe(streamId);
  };

  const handleJoinStream = (id) => {
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
      toast.success("Publish successful");
    } catch (err) {
      console.log(err.message);
      toast.error(`Failed to publish! Reason: ${err.message}`);
    }
  };

  const handleJoinTestStream = () => {
    subscribe(RENDEVOUS_DEFAULT_STREAMID);
  };

  const handleUnsubscribe = async () => {
    try {
      const streamr = new StreamrClient({
        auth: { ethereum: window.ethereum },
      });
      await streamr.unsubscribe();
      toast.success("You have successfully unsubscribed");
    } catch (err) {
      console.log(err.message, "Failed to Unsubscribe!");
      toast.error(`Failed to Unsubscribe! \n Reason: ${err.message}`);
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
          <a
            href="https://github.com/midesofek/rendevous-data-stream"
            target="_blank"
          >
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
