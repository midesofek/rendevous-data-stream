import React, { useState, useEffect } from "react";
import StreamrClient from "streamr-client";

export function DisplayMessage({ id }) {
  const [messages, setMessages] = useState([]);
  const [position, setPosition] = useState("");

  useEffect(() => {
    // Authenticate user -- change 'client' to "streamr"
    const streamr = new StreamrClient({
      // auth: { ethereum: window.ethereum },
    });

    const subscription = streamr.subscribe(id, (data, metadata) => {
      const timeReceived = new Date(metadata.timestamp).toISOString();
      const newMessage = `${data.message} at: ${timeReceived}`;

      // Update the messages state with the new message
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Update the position state
      setPosition(data.message);

      // Render location marker or perform other actions here
    });

    // Clean up the subscription when the component unmounts
    return () => {
      subscription.unsubscribe();
    };
  }, [id]);

  return (
    <div>
      {/* Render location marker or other components */}
      {/* Example: <LocationMarker position={position} /> */}

      <div className="message-content">
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    </div>
  );
}

// const subscribe = (id) => {
//   // Authenticate user -- change 'client' to "streamr"
//   const streamr = new StreamrClient({
//     // auth: { ethereum: window.ethereum },
//   });

//   return streamr.subscribe(id, (data, metadata) => {
//     // resendPreviousMessages();
//     const timeReceived = new Date(metadata.timestamp).toISOString();

//     const messageElement = document.createElement("p");
//     messageElement.textContent = `${data.message} at: ${timeReceived}`;
//     position = data.message;
//     messageContent.appendChild(messageElement);

//     renderLocationMarker(position, metadata.publisherId);
//   });
// };
