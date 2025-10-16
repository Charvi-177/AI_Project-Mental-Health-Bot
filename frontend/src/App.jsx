import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import ChatBox from './components/ChatBox';
import ChatHistory from './components/ChatHistory';
import FeedbackModal from './components/FeedbackModal';
import { login, register, getHistory, logMessage, submitFeedback } from './api';

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('mh_user'));
    } catch { return null; }
  });
  const [token, setToken] = useState(() => localStorage.getItem('mh_token') || null);
  const [history, setHistory] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    if (user && token) {
      loadHistory();
    }
  }, [user, token]);

  async function loadHistory() {
    const res = await getHistory(token);
    if (res && res.history) setHistory(res.history);
  }

  async function handleLogin(username, password, isRegister=false) {
    try {
      const res = isRegister ? await register(username, password) : await login(username, password);
      if (res && res.token) {
        setUser(res.user);
        setToken(res.token);
        localStorage.setItem('mh_user', JSON.stringify(res.user));
        localStorage.setItem('mh_token', res.token);
      } else {
        alert(res.error || 'Login/Register failed');
      }
    } catch (err) {
      console.error(err);
      alert('Request failed');
    }
  }

  async function handleSendMessage(text) {
    // Log user message to backend
    if (token) {
      await logMessage(token, 'user', text);
      loadHistory();
    }

    // Open chatbase widget and prefill / focus so user can continue in widget
    if (window.chatbase && typeof window.chatbase === 'function') {
      try {
        // If chatbase API supports sending messages, we try; otherwise open widget.
        if (window.chatbase('isInitialized')) {
          // some embed scripts expose methods; if not, fallback to open
          try { window.chatbase('chat.open'); } catch { window.chatbase('open'); }
        } else {
          window.chatbase('open');
        }
      } catch (e) {
        // fallback: open
        try { window.chatbase('open'); } catch {}
      }
    } else {
      // If embed not loaded, instruct user
      alert('Chat widget loading — open the floating chat on bottom-right to continue.');
    }
  }

  async function handleFeedback(data) {
    if (!token) return alert('Please login to send feedback');
    await submitFeedback(token, data.convo_id, data.rating, data.note);
    setShowFeedback(false);
    alert('Thanks for your feedback — it helps improve the assistant.');
  }

  return (
    <div className="app-root">
      <Header user={user} onAuth={handleLogin} onLogout={() => { setUser(null); setToken(null); localStorage.removeItem('mh_user'); localStorage.removeItem('mh_token'); }} />
      <main className="main-grid">
        <section className="left-col">
          <ChatBox onSend={handleSendMessage} />
        </section>

        <aside className="right-col">
          <ChatHistory history={history} />
          <button className="feedback-btn" onClick={() => setShowFeedback(true)}>Give Feedback</button>
        </aside>
      </main>

      {showFeedback && <FeedbackModal onClose={() => setShowFeedback(false)} onSubmit={handleFeedback} />}
    </div>
  );
}
