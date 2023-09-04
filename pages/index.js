// import Head from "next/head";
// import Image from "next/image";
import { Inter } from "next/font/google";
import { Header } from "/components/Header";
import { Navbar } from "/components/Navbar";
import { Sidebar } from "/components/Sidebar";
import { RenderMap } from "/components/RenderMap";
import { IncomingStreams } from "/components/IncomingStreams";
import { useState } from "react";
// import styles from "/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [messages, setMessages] = useState([]);

  function handleAddNewMessages(streamMessage) {
    setMessages((messages) => [...messages, streamMessage]);
  }

  return (
    <>
      <Header />
      <Navbar onAddNewMessages={handleAddNewMessages} />
      <RenderMap />
      <main>
        <div></div>
        {/* <Sidebar /> */}
        {/* <IncomingStreams />*/}
        <IncomingStreams messages={messages} />

        <div id="map"></div>
      </main>
    </>
  );
}
