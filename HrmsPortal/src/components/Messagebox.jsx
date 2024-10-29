import React, { useState, useRef, useEffect } from 'react';

function Messagebox() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messageEndRef = useRef(null); // Reference to auto-scroll

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && message.trim()) {
      const timestamp = new Date().toLocaleString();
      setMessages([{ text: message, time: timestamp }, ...messages]);
      setMessage('');
    }
  };

  useEffect(() => {
    // Scroll to the top when a new message is added
    if (messageEndRef.current) {
      messageEndRef.current.scrollTop = 0;
    }
  }, [messages]);

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <input
        type="text"
        placeholder="Type a message and press Enter"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
      />
      <div
        ref={messageEndRef}
        style={{
          border: '1px solid #ddd',
          padding: '10px',
          maxHeight: '200px',
          overflowY: 'scroll',
          display: 'flex',
          flexDirection: 'column' // Keep order as column
        }}
      >
        <h3>Messages</h3>
        {messages.map((msg, index) => (
          <p key={index} style={{ margin: '5px 0' }}>
            <strong>{msg.text}</strong>
            <br />
            <small style={{ color: 'gray' }}>{msg.time}</small>
          </p>
        ))}
      </div>
    </div>
  );
}

export default Messagebox;
