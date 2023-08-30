import React, { useState } from "react";

export const Sidebar = () => {
  const [isSidebarHidden, setIsSidebarHidden] = useState(true);

  const toggleSideBar = () => {
    setIsSidebarHidden((prevState) => !prevState);
  };

  return (
    <>
      <button className="toggle-sidebar-button" onClick={toggleSideBar}>
        <i className="fas fa-bars"></i>
      </button>
      <div className={`sidebar ${isSidebarHidden ? "sidebar-hidden" : ""}`}>
        <form className="form">
          <div className="form__row form__row-top">
            <input
              type="text"
              name=""
              id="input--streamId"
              placeholder="Enter Stream ID"
            />
            {/* <!--This should notify if you have access --> */}
          </div>
          <div className="form__row form__row-inline">
            <button id="join-data-stream">
              Join Data Stream
              <i className="fa fa-database" aria-hidden="true"></i>
            </button>
            <button className="publish--stream">
              Share Your Position
              {/* <!-- <i className="fa fa-map-marker" aria-hidden="true"></i> --> */}
            </button>
          </div>
          <div className="form__row form__row-inline">
            <button id="test-data-stream">
              Test Data Stream
              <i className="fa fa-database" aria-hidden="true"></i>
            </button>
            <button id="button-stop-sharing">Stop Sharing Data</button>
          </div>

          <div className="form__row form__row-inline">
            <button id="button-unsubscribe">Unsubscribe</button>
          </div>
          <button className="form__btn" id="create-new-stream">
            +Create New Stream
            <i className="fa fa-external-link" aria-hidden="true"></i>
          </button>
        </form>
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

// export default Sidebar;
