// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

const FRONTEND = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';
app.use(cors({ origin: FRONTEND, credentials: true }));

// routes
const auth = require('./routes/auth');
const convo = require('./routes/convo');
const feedback = require('./routes/feedback');

app.use('/api/auth', auth.router);
app.use('/api/convo', convo);
app.use('/api/feedback', feedback);

app.get('/', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
