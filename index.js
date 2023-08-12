///////////////////////////////////////////////
// Private Location Sharing Feature
///////////////////////////////////////////////

// ✅ 1. Add connect wallet button
// ✅ 2. Implement function to share coords through streamr
// ✅ 3. Make One users location show on map
// 4. Make multiple user's location show on map

// import { StreamrClient } from "streamr-client";
// import { Stream } from "streamr-client";
// import streamr from "streamr-client";
// import { PRIVATE_KEY } from "./config";

// require("dotenv").config();

const msgDisplay = document.getElementById("message--window");

// Authenticate user
const client = new StreamrClient({
  auth: { ethereum: window.ethereum },
});

const devStreamId = "0x1339514086fc15c5e38af4e0407c469ca3911992/test/stream"; // later get this dynamically

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

// // fn to get stream with ID
// const getStream = async () => {
// const id = await client.getStream(devStreamId);
// };
// getStream();

// fn to publish streams
const userCoords = [];

const publishData = async () => {
  try {
    const data = {
      message: userCoords,
    };
    (await client.publish(devStreamId, data, {
      timestamp: new Date(),
    })) && console.log("Publish successful");
    console.log(data);
  } catch (err) {
    console.error(err.message);
  }
};

// fn to subscribe to streams
let position = 0;

client.subscribe(devStreamId, (data, metadata) => {
  const timeReceived = new Date(metadata.timestamp).toISOString();
  console.log(data, `metadata is ${timeReceived}`);

  const messageElement = document.createElement("p");
  messageElement.textContent = `${data.message} at: ${timeReceived}`;
  position = data.message;
  msgDisplay.appendChild(messageElement);

  renderLocationMarker(position);
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

const renderLocationMarker = function (position) {
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
    .setPopupContent(`User 1`)
    .openPopup(); // Display Marker
};

//////////// Handle Subscribe Events ////////////
// ✅ 1. When a user subscribes to the stream, add a new marker to the page
// ===== TWO options - a. Listen for subscribe event then display directly -b. store coords in an array then loop and display
// 2. This marker should show the timestamp of the user that connected
// 3. This marker should show the address of the user that connected
// Tip: can add an event listener to listen for marker addition - then notify subscriberen notify subscriber en notify subscriber////

// Tip: can add an event listener to listen for marker addition - then notify subscriber
