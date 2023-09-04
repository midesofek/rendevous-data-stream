import { Sidebar } from "./Sidebar";
import { connectWallet } from "./utils/connectWallet";
import React, { useState } from "react";
// import { ConnectWallet } from "@thirdweb-dev/react";

export const Navbar = function ({ onAddNewMessages }) {
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async function () {
    try {
      if (!window.ethereum) return console.log("No wallet installed");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();

      const address = await signer.getAddress();

      const truncatedAddress = address.slice(0, 4) + ".." + address.slice(-2);
      console.log(truncatedAddress);
      setIsConnected(true);
    } catch (err) {
      setIsConnected(false);
      console.error(err.message);
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <span className="brand">Rendevous</span>
      </div>
      <Sidebar onAddNewMessages={onAddNewMessages} />

      <ul className="navbar-links">
        <li>
          <a href="#" className="navbar--view-streamers-location navbar-link">
            Join Stream <i className="fa fa-database" aria-hidden="true"></i>
          </a>
        </li>
        <li>
          <a href="#" className="navbar-link">
            Marketplace <i className="fa fa-exchange" aria-hidden="true"></i>
          </a>
        </li>
        <li>
          <a href="#" className="navbar--view-stramers-chat navbar-link">
            Stream Chat <i className="fa fa-comments" aria-hidden="true"></i>
          </a>
        </li>
        <li>
          <a href="#" className="navbar-link">
            Docs <i className="fa fa-external-link" aria-hidden="true"></i>
          </a>
        </li>
      </ul>
      {/* <ConnectWallet
        className="connect-wallet-button"
        switchToActiveChain={true}
        theme="light"
      /> */}
      <button className="connect-wallet-button" onClick={connectWallet}>{`${
        isConnected ? "Connected!" : "Connect Wallet"
      } `}</button>
    </div>
  );
};
