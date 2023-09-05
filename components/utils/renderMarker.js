export default async function renderLocationMarker(
  map,
  position,
  publisherAddress
) {
  const truncAddress = (address) => {
    const truncatedAddress = address.slice(0, 4) + ".." + address.slice(-2);
    return truncatedAddress;
  };

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
}
