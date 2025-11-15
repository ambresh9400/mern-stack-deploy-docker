import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const fetchMessages = async () => {
    const res = await axios.get(`${backendURL}/messages`);
    setMessages(res.data);
  };

  const sendMessage = async () => {
    await axios.post(`${backendURL}/message`, { text });
    setText("");
    fetchMessages();
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>MERN App (Docker)</h1>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter message"
      />
      <button onClick={sendMessage}>Send</button>

      <h2>Messages:</h2>
      <ul>
        {messages.map((m) => (
          <li key={m._id}>{m.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
