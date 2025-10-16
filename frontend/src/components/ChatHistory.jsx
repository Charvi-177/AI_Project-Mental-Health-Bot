import React from 'react';

export default function ChatHistory({ history = [] }) {
  return (
    <div className="history-card">
      <h3>Your recent conversation</h3>
      {history.length === 0 ? <p className="muted">No history yet — login and send a message to save conversations.</p> : (
        <ul className="history-list">
          {history.map((m) => (
            <li key={m.id} className={`msg ${m.role}`}>
              <div className="meta">{m.role === 'user' ? 'You' : 'Assistant'} • <span className="time">{new Date(m.created_at).toLocaleString()}</span></div>
              <div className="text">{m.message}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
