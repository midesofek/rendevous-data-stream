import { useEffect } from "react";

export function Subscribe(id) {
  useEffect(() => {
    // const subscribe = (id) => {
    // Authenticate user -- change 'client' to "streamr"
    const streamr = new StreamrClient({
      auth: { ethereum: window.ethereum },
    });

    streamr.subscribe(id, (data, metadata) => {
      // resendPreviousMessages();
      const timeReceived = new Date(metadata.timestamp).toISOString();

      const newMessage = `${data.message} at: ${timeReceived}`;
      console.log(newMessage);

      //   // Update the messages state with the new message
      //   setMessages((prevMessages) => [...prevMessages, newMessage]);

      //   // Update the position state
      //   setPosition(data.message);
      //   console.log(messages, position);

      //   // renderLocationMarker(position, metadata.publisherId);
      //   return (
      //     <div>
      //       {/* Render location marker or other components */}
      //       {/* Example: <LocationMarker position={position} /> */}

      //       <div className="message-content">
      //         {messages.map((message, index) => (
      //           <p key={index}>{message}</p>
      //         ))}
      //       </div>
      //     </div>
      //   );
    });
    // };
  }, [id]);
}
