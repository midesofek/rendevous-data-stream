export const truncAddress = (address) => {
  const truncatedAddress = address.slice(0, 4) + ".." + address.slice(-2);
  return truncatedAddress;
};
