const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080';

export async function register(username, password) {
  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  return res.json();
}

export async function login(username, password) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  return res.json();
}

export async function logMessage(token, role, message) {
  const res = await fetch(`${API_BASE}/api/convo/log`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ role, message })
  });
  return res.json();
}

export async function getHistory(token, limit = 50) {
  const res = await fetch(`${API_BASE}/api/convo/history?limit=${limit}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
}

export async function submitFeedback(token, convo_id, rating, note) {
  const res = await fetch(`${API_BASE}/api/feedback/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ convo_id, rating, note })
  });
  return res.json();
}
