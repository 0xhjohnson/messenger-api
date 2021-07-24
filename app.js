const express = require('express');
const cors = require('cors');
const app = express();
const messagesRouter = require('./controllers/messages');

app.use(cors());
app.use(express.json());

app.use('/api/messages', messagesRouter);

module.exports = app;
