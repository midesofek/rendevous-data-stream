///////////////////////////////////////////////
// Private Location Sharing Feature [0x..92 is at Los Angeles, Time: Timestamp]
///////////////////////////////////////////////

import { StreamrClient, STREAMR_STORAGE_NODE_GERMANY } from "streamr-client";
import { connectWallet } from "./src/connectwallet";
import { truncAddress } from "./utils/helper";
import { PUBLISH_INTERVAL } from "./utils/config";
import { id } from "ethers/lib/utils";

// require("dotenv").config();

const messageWindow = document.getElementById("message--window");
const closeMessageButton = document.querySelector(".close-button");
const toggleMessageButton = document.querySelector(".toggle-message-button");
const messageContent = document.querySelector(".message-content");
const btnConnectWallet = document.querySelector(".connect-wallet-button");
const btnPublishStreamData = document.querySelector(".publish--stream");
const btnJoinStream = document.getElementById("join-data-stream");
const btnUnsubscribe = document.getElementById("button-unsubscribe");
const btnStopSharingPosition = document.getElementById("button-stop-sharing");

const toggleSidebarButton = document.querySelector(".toggle-sidebar-button");
const sidebar = document.querySelector(".sidebar");
const sidebarViewStreams = document.querySelector(
  ".navbar--view-streamers-location"
);
const sidebarStreamChat = document.querySelector(".navbar--view-stramers-chat");
const pageViewStreams = document.querySelector(".stream-window");
const pageViewStreamChat = document.querySelector(".stream--chat-window");

// connect wallet button
btnConnectWallet.addEventListener("click", connectWallet);

//////////////////////////////////////////////////////////////////////////////
//////////////////////////// TOGGLE SIDE-BAR ///////////////////////////

// toggle side bar
const toggleSideBar = () => {
  sidebar.classList.toggle("sidebar-hidden");
};
toggleSidebarButton.addEventListener("click", toggleSideBar);

// Toggle the message window and the x button
const toggeleMessageWindow = () => {
  console.log("Button works");
  messageContent.classList.toggle("hidden");
  toggleMessageButton.classList.toggle("show-search-icon");
  toggleMessageButton.classList.toggle("remove-times-icon");
};
closeMessageButton.addEventListener("click", toggeleMessageWindow);

//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
////////////////////////////  STREAMS PAGE DISPLAY ///////////////////////////

const showViewStreamsPage = function () {
  console.log("Button Works");
  pageViewStreams.classList.toggle("hidden");
};
sidebarViewStreams.addEventListener("click", showViewStreamsPage);

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
////////////////////////////  STREAM CHAT DISPLAY ///////////////////////////
const showStreamChatPage = function () {
  console.log("Stream Chat Button Works");
  pageViewStreamChat.classList.toggle("hidden");
};
sidebarStreamChat.addEventListener("click", showStreamChatPage);

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

// Authenticate user -- change 'client' to "streamr"
const client = new StreamrClient({
  auth: { ethereum: window.ethereum },

  // encryption: {
  //   litProtocolEnabled: true,
  //   litProtocolLogging: false,
  // },
});

const devStreamId = "0x1339514086fc15c5e38af4e0407c469ca3911992/test/stream"; // later get this dynamically

// adding storage to stream
const handleStorage = async () => {
  const storeStreams = await client.addStreamToStorageNode(
    devStreamId,
    STREAMR_STORAGE_NODE_GERMANY
  );
  const storage = await client.getStorageNodes();
  console.log(storage);
};
// handleStorage();

// create private stream and generate id
const createStreamId = async function (uniquename1, uniquename2) {
  const streamId = await client.createStream({
    id: `${await client.getAddress()}/${uniquename1}/${uniquename2}`,
  });
  console.log(streamId.id);
};

// update stream by adding a description
// const addStreamDescription = async function (description) {
//   await client.updateStream({
//     description,
//   });
// };

////////////////////////////////////////////////////////////////////////////////
/////////////////////////// PUBLISH / SUBSCRIBE ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// function to get stream with ID
const getStream = async function (inputStreamId) {
  console.log("get Btn Works");
  // this.#appId = await client.getStream(inputStreamId);
  // const appId = await client.getStream(inputStreamId);
};
btnJoinStream.addEventListener("click", getStream);

// function to stop sharing position
const stopSharingPosition = async function () {
  console.log("Stop sharing btn works");
};
btnStopSharingPosition.addEventListener("click", stopSharingPosition);

// function to unsubscribe from stream
const unsubscribeFromStream = async () => {
  console.log("Unsubscribe works");
};
btnUnsubscribe.addEventListener("click", unsubscribeFromStream);

// function to publish streams
const userCoords = [];

const publishData = async () => {
  try {
    const data = {
      message: userCoords,
    };
    const handlePublish = async () => {
      await client.publish(devStreamId, data, {
        timestamp: new Date(),
      });
      console.log("Publish successful");
    };
    setInterval(handlePublish);

    // (await client.publish(devStreamId, data, {
    //   timestamp: new Date(),
    // })) && console.log("Publish successful");
  } catch (err) {
    console.error(err.message);
  }
};
btnPublishStreamData.addEventListener("click", publishData);

// function to subscribe to streams
let position = 0;

const resendPreviousMessages = async () => {
  client.resend(
    devStreamId,
    {
      from: {
        timestamp: Date.now() - 1000 * 60 * 30, // 30 minutes ago
      },
      // last: 5,
    },
    (data, metadata) => {
      const timeReceived = new Date(metadata.timestamp).toISOString();

      const messageElement = document.createElement("p");
      messageElement.textContent = `${data.message} at: ${timeReceived}`;
      position = data.message;
      messageContent.appendChild(messageElement);

      renderLocationMarker(position, metadata.publisherId);
    }
  );
};

client.subscribe(devStreamId, (data, metadata) => {
  resendPreviousMessages();
  const timeReceived = new Date(metadata.timestamp).toISOString();

  const messageElement = document.createElement("p");
  messageElement.textContent = `${data.message} at: ${timeReceived}`;
  position = data.message;
  messageContent.appendChild(messageElement);

  renderLocationMarker(position, metadata.publisherId);
});

////////////////////////////////////////////////////////////////
//////////////////////// LOAD MAP //////////////////////////////
////////////////////////////////////////////////////////////////

let map;

const loadMap = function (pos) {
  console.log(pos, "");
  const zoomLevel = 13;
  map = L.map("map").setView(pos, zoomLevel);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
};

// get user's location

const getLocation = function () {
  const success = function (pos) {
    const { latitude, longitude } = pos.coords;
    userCoords.push(latitude, longitude);
    console.log(
      `User latitude is ${userCoords[0]}\nUser Longitude is ${userCoords[1]}`
    );
    loadMap(userCoords);
  };

  const failedToConnect = function () {
    alert("Could not get Your Location");
  };

  if (navigator) {
    navigator.geolocation.getCurrentPosition(success, failedToConnect);
  }
};
getLocation();
console.log(userCoords);

////////////////////////////////////////////////////////////////////////////////
///////////////////////// RENDER LOCATION ON MAP ///////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const renderLocationMarker = async function (position, publisherAddress) {
  const pubAddress = truncAddress(publisherAddress);
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
    .setPopupContent(`User: ${await pubAddress}`)
    .openPopup(); // Display Marker
};

////////////////////////////////////////////////////////////////////////////////
///////////////////////// STREAM CHAT SIDEBAR ///////////////////////////////
////////////////////////////////////////////////////////////////////////////////
