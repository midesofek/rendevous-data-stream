import { useEffect, useState } from "react";

let map;

export const RenderMap = function ({ setUserCoordsState }) {
  console.log("RenderMap??");
  // const [position, setPosition] = useState(0);

  const userCoords = [];
  // let position = 0;
  // let map;

  function loadMap(pos) {
    console.log(pos, "");
    const zoomLevel = 13;
    map = L.map("map").setView(pos, zoomLevel);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    setUserCoordsState(pos);
    renderLocationMarker(pos);
  }

  async function renderLocationMarker(position) {
    return L.marker(position)
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

  // get user's location

  const getLocation = function () {
    const success = function (pos) {
      const { latitude, longitude } = pos.coords;
      userCoords.push(latitude, longitude);
      console.log("v1", userCoords);
      console.log(
        `User latitude is ${userCoords[0]}\nUser Longitude is ${userCoords[1]}`
      );
      loadMap([...userCoords]);
    };

    const failedToConnect = function () {
      alert("Could not get Your Location");
    };

    useEffect(() => {
      if (navigator) {
        console.log("Step 1");
        navigator.geolocation.getCurrentPosition(success, failedToConnect);
      }
    }, []);
  };
  getLocation();
  console.log(userCoords);

  async function renderLocationMarker2(messages) {
    const truncAddress = (address) => {
      const truncatedAddress = address.slice(0, 4) + ".." + address.slice(-2);
      return truncatedAddress;
    };

    // const pubAddress = truncAddress(publisherAddress);
    L.marker(messages)
      .addTo(map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
        })
      )
      .setPopupContent(`User`)
      .openPopup(); // Display Marker
  }
};

export async function renderMarker(position) {
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
    .setPopupContent(`User Joined the Stream`)
    .openPopup(); // Display Marker
}
