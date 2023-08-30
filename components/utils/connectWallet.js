// connect wallet

const connectWallet = async function () {
  try {
    let state = false;
    if (!window.ethereum) return console.log("No wallet installed");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();

    const address = await signer.getAddress();

    const truncatedAddress = address.slice(0, 4) + ".." + address.slice(-2);
    console.log(truncatedAddress);
    state = !state;
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = { connectWallet };
