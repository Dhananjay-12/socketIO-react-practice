import React, { useEffect, useState } from "react";
import "./styles.css";

import io from "socket.io-client";
const socket = io.connect("http://localhost:3000");
function App() {
  const [message, setMessage] = useState("");
  const [messageRecieved, setMessageRecieved] = useState("");

  useEffect(() => {
    socket.on("receive-message", (data) => {
      setMessageRecieved(data.message);
    });
  }, []);

  function sendMessage() {
    socket.emit("send-message", { message });
  }

  return (
    <div className="container">
      <div>
        <h1 className="heading">Message</h1>
        <p className="message">{messageRecieved}</p>
      </div>
      <div className="box">
        <input
          type="text"
          placeholder="Enter your message here..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
