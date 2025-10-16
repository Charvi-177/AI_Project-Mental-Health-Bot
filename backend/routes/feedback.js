// feedback.js
const express = require('express');
const db = require('../db');
const { authMiddleware } = require('./auth');

const router = express.Router();

router.post('/submit', authMiddleware, (req, res) => {
  try {
    const userId = req.user.id;
    const { convo_id, rating, note } = req.body;
    if (typeof rating !== 'number') return res.status(400).json({ error: 'Invalid rating' });

    const info = db.prepare('INSERT INTO feedback (user_id, convo_id, rating, note) VALUES (?, ?, ?, ?)').run(userId, convo_id || null, rating, note || null);
    res.json({ ok: true, id: info.lastInsertRowid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
