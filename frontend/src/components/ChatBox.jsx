import React, { useState } from 'react';

export default function ChatBox({ onSend }) {
  const [text, setText] = useState('');

  function send() {
    if (!text.trim()) return;
    onSend(text.trim());
    setText('');
  }

  function onKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="chatbox-card">
      <h2>Start a conversation</h2>
      <p className="hint">Use the input below to log a message and open the chat widget (the AI lives in the Chatbase widget).</p>

      <textarea
        className="input"
        placeholder="Type how you're feeling or ask for help..."
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={onKey}
        rows={4}
      />

      <div className="actions">
        <button className="btn" onClick={send}>Send & Open Chat</button>
        <button className="btn ghost" onClick={() => {
          // open chatbase widget
          try { window.chatbase && window.chatbase('open'); } catch { alert('Chat loading...'); }
        }}>Open Chat Widget</button>
      </div>

      <div className="safety-note">
        <strong>Safety:</strong> This assistant is for supportive conversation and is not a replacement for professional mental health care.
      </div>
    </div>
  );
}
