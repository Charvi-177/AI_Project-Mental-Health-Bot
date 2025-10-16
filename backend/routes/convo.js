// convo.js - conversation logging
const express = require('express');
const db = require('../db');
const { authMiddleware } = require('./auth');

const router = express.Router();

// record a message
router.post('/log', authMiddleware, (req, res) => {
  try {
    const userId = req.user.id;
    const { role, message } = req.body; // role: 'user' | 'bot'
    if (!role || !message) return res.status(400).json({ error: 'Missing fields' });

    const info = db.prepare('INSERT INTO conversations (user_id, role, message) VALUES (?, ?, ?)').run(userId, role, message);
    res.json({ ok: true, id: info.lastInsertRowid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// fetch last N messages
router.get('/history', authMiddleware, (req, res) => {
  try {
    const userId = req.user.id;
    const limit = parseInt(req.query.limit || '50', 10);
    const rows = db.prepare('SELECT id, role, message, created_at FROM conversations WHERE user_id = ? ORDER BY id DESC LIMIT ?').all(userId, limit);
    res.json({ history: rows.reverse() }); // oldest-first
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
