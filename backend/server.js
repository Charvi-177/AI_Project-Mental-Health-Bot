// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

const FRONTEND = process.env.FRONTEND_ORIGIN || null;
app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (FRONTEND && origin === FRONTEND) return cb(null, true);
    if (/^http:\/\/localhost:\d+$/.test(origin)) return cb(null, true);
    cb(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

// routes
const auth = require('./routes/auth');
const convo = require('./routes/convo');
const feedback = require('./routes/feedback');

app.use('/api/auth', auth.router);
app.use('/api/convo', convo);
app.use('/api/feedback', feedback);

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body || {};
    if (!message || typeof message !== 'string') return res.status(400).json({ error: 'message required' });
    const reply = 'I hear you. It can be tough. Would you like a grounding exercise, a breathing technique, or a quick tip?';
    res.json({ reply });
  } catch (e) {
    res.status(500).json({ error: 'server error' });
  }
});

app.get('/', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
