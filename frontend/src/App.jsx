import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import ChatBox from './components/ChatBox';
import { chat } from './api';

export default function App() {
  const [messages, setMessages] = useState(() => []);
  const [pending, setPending] = useState(false);

  async function handleSendMessage(text) {
    const userMsg = { id: Date.now() + '-u', role: 'user', message: text, created_at: new Date().toISOString() };
    setMessages(m => [...m, userMsg]);
    setPending(true);
    try {
      const res = await chat(text);
      const reply = {
        id: Date.now() + '-b',
        role: 'bot',
        message: res.reply || 'Sorry, I could not generate a response right now.',
        created_at: new Date().toISOString()
      };
      setMessages(m => [...m, reply]);
    } catch (e) {
      const errMsg = { id: Date.now() + '-e', role: 'bot', message: 'Network error. Please try again.', created_at: new Date().toISOString() };
      setMessages(m => [...m, errMsg]);
    } finally {
      setPending(false);
    }
  }

  useEffect(() => {
    const el = document.querySelector('.chat-scroll');
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, pending]);

  return (
    <div className="full-chat">
      <Header />
      <div className="chat-layout">
        <div className="chat-scroll">
          <ul className="history-list">
            {messages.map(m => (
              <li key={m.id} className={`msg ${m.role}`}>
                <div className="meta">{m.role === 'user' ? 'You' : 'Assistant'} • <span className="time">{new Date(m.created_at).toLocaleString()}</span></div>
                <div className="text">{m.message}</div>
              </li>
            ))}
            {pending && (
              <li className="msg bot"><div className="typing"><span className="dot" /><span className="dot" /><span className="dot" /></div></li>
            )}
          </ul>
        </div>
        <div className="input-dock">
          <ChatBox onSend={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}
