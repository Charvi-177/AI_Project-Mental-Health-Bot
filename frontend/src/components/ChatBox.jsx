import React, { useState } from 'react';

export default function ChatBox({ onSend }) {
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const suggestions = [
    "I'm feeling overwhelmed",
    'I need coping tips',
    "Can we do a breathing exercise?",
    'How do I handle stress at school?',
    'Suggest a daily self-care habit'
  ];

  function send() {
    if (!text.trim()) return;
    onSend(text.trim());
    setText('');
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1200);
  }

  function onKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="chatbox-card">

      <textarea
        className="input"
        placeholder="Message the assistant..."
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={onKey}
        rows={4}
      />

      <div className="actions">
        <button className="btn" onClick={send}>Send</button>
      </div>

      <div className="chip-row" aria-label="Quick replies">
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            className="chip"
            onClick={() => setText(s)}
            title={s}
          >{s}</button>
        ))}
      </div>

      <div className="safety-note">This assistant is supportive but not a replacement for professional care.</div>

      {isTyping && (
        <div className="typing" role="status" aria-live="polite" style={{marginTop:12}}>
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
        </div>
      )}
    </div>
  );
}
