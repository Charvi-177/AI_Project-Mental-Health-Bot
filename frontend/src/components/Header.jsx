import React, { useState } from 'react';

export default function Header({ user, onAuth, onLogout }) {
  const [showForm, setShowForm] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();
    if (!username || !password) return alert('fill both');
    await onAuth(username, password, isRegister);
    setShowForm(false);
    setUsername(''); setPassword('');
  }

  return (
    <header className="site-header">
      <div className="brand">
        <h1>Mental Health Assistant</h1>
        <p className="tagline">Supportive, non-judgmental conversation — powered by Chatbase</p>
      </div>

      <div className="auth-area">
        {user ? (
          <>
            <span className="welcome">Hi, {user.username}</span>
            <button className="btn ghost" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <button className="btn" onClick={() => { setIsRegister(false); setShowForm(v => !v); }}>Login</button>
            <button className="btn alt" onClick={() => { setIsRegister(true); setShowForm(v => !v); }}>Register</button>
            {showForm && (
              <form className="auth-form" onSubmit={submit}>
                <input placeholder="username" value={username} onChange={e => setUsername(e.target.value)} />
                <input placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button className="btn small" type="submit">{isRegister ? 'Register' : 'Login'}</button>
              </form>
            )}
          </>
        )}
      </div>
    </header>
  );
}
