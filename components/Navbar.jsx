import { Sidebar } from "./Sidebar";
import { connectWallet } from "./utils/connectWallet";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export const Navbar = function ({ onAddNewMessages, userCoords }) {
  const [isConnected, setIsConnected] = useState(false);
  const router = useRouter();

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

  const handleGuide = (e) => {
    e.preventDefault();
    window.open(
      "https://midesofek.hashnode.dev/streamr-open-data-challenge-introducing-rendevous",
      "_blank"
    );
  };

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <span className="brand">Rendevous</span>
      </div>
      <Sidebar onAddNewMessages={onAddNewMessages} userCoords={userCoords} />

      <ul className="navbar-links">
        <Link
          href={"/"}
          className="navbar--view-streamers-location navbar-link"
        >
          Join Stream <i className="fa fa-database" aria-hidden="true"></i>
        </Link>
        <li>
          <Link href={"/Marketplace"} className="navbar-link">
            Marketplace <i className="fa fa-exchange" aria-hidden="true"></i>
          </Link>
        </li>
        <li>
          <Link
            href={"/StreamChat"}
            className="navbar--view-stramers-chat navbar-link"
          >
            Stream Chat <i className="fa fa-comments" aria-hidden="true"></i>
          </Link>
        </li>
        <li>
          <a href="" className="navbar-link" onClick={handleGuide}>
            Guide <i className="fa fa-external-link" aria-hidden="true"></i>
          </a>
        </li>
      </ul>
      <button className="connect-wallet-button" onClick={connectWallet}>{`${
        isConnected ? "Connected!" : "Connect Wallet"
      } `}</button>
    </div>
  );
};
