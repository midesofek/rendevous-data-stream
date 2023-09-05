import { useState } from "react";
import { Inter } from "next/font/google";
import { Header } from "/components/Header";
import { Navbar } from "/components/Navbar";
import { Sidebar } from "/components/Sidebar";
import { RenderMap } from "/components/RenderMap";
import { ToastContainer, toast } from "react-toastify";
import { IncomingStreams } from "/components/IncomingStreams";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Marketplace from "/components/Marketplace";
import StreamChat from "/components/StreamChat";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [userCoordsState, setUserCoordsState] = useState([]);
  const [marker, setLocationMarker] = useState();

  function handleAddNewMessages(streamMessage) {
    setMessages((messages) => [...messages, streamMessage]);
  }

  return (
    <>
      <Header />
      <Navbar
        onAddNewMessages={handleAddNewMessages}
        userCoords={userCoordsState}
      />
      <RenderMap
        setUserCoordsState={setUserCoordsState}
        messages={messages}
        onSetLocationMarker={setLocationMarker}
      />
      <main>
        {/* <Sidebar /> */}
        {/* <IncomingStreams />*/}
        <IncomingStreams messages={messages} />
        <ToastContainer />
        <div id="map"></div>
      </main>
    </>
  );
}
