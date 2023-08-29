export const fetchSampleData = async () => {
  const res = await fetch("https://randomuser.me/api/?results=10");
  const data = await res.json();
  const results = await data.results;

  const user = results.map((user) => {
    const userLatitude = user.location.coordinates.latitude;
    const userLongitude = user.location.coordinates.longitude;
    return [userLatitude, userLongitude];
  });
  console.log(user);
  return user;
};
