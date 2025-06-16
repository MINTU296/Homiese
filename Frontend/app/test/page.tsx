'use client';
import { useState } from 'react';

export default function TestPage() {
  const [message, setMessage] = useState('');

  const sendToServer = async () => {
    try {
        console.log("function ke andar aa gye ji")
      const res = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      alert(data.response);
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendToServer} style={{ marginLeft: '1rem' }}>
        Send
      </button>
    </div>
  );
}
