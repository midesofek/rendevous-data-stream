import { useEffect, useState } from "react";

export const RenderMap = function () {
  console.log("RenderMap??");
  const [userCoords, setUserCoords] = useState([]);
  const [position, setPosition] = useState(0);

  // let position = 0;
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

    useEffect(() => {
      if (navigator) {
        console.log("Step 1");
        navigator.geolocation.getCurrentPosition(success, failedToConnect);
      }
    }, []);
  };
  getLocation();
  console.log(userCoords);
};
