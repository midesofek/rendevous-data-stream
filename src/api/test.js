//0xAE60c23E23A1a4B570B4B042Bd82f617ac5d7832

const fetchSampleData = async () => {
  //   const res = await fetch("https://randomuser.me/api/?results=2");
  const res = await fetch("https://randomuser.me/api/?nat=ca");
  const data = await res.json();
  const results = await data.results;
  //   console.log(results[0].location.coordinates);
  let userLatitude = 0;
  let userLongitude = 0;
  //   results.forEach((user, i) => {
  //     const firstname = user.name.first;
  //     userLatitude = user.location.coordinates.latitude;
  //     userLongitude = user.location.coordinates.longitude;
  //     console.log(
  //       `User ${
  //         i + 1
  //       }: Name ${firstname} || Lat: ${userLatitude}, Long: ${userLongitude} `
  //     );
  //   });
  const user = results.map((user) => {
    const firstname = user.name.first;
    const userLatitude = user.location.coordinates.latitude;
    const userLongitude = user.location.coordinates.longitude;
    return [userLatitude, userLongitude];
  });
  console.log(user);
  return user;
};
// console.log(fetchSampleData());

////////
////////
////////
////////
////////

const publish = async () => {
  console.log("Publishing............. ");

  const loadTestData = await fetchSampleData();
  console.log(loadTestData);

  loadTestData.forEach((testCoords) => {
    const data = {
      message: testCoords,
    };

    console.log(data, new Date());
  });

  //   const handlePublish = async () => {
  //     await client.publish(devStreamId, data, {
  //       timestamp: new Date(),
  //     });
  //     console.log("Publish successful");
  //   };
};
publish();
