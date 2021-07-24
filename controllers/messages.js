const messagesRouter = require('express').Router();
const fakeDb = require('../fakeDb');

/**
 * Route for sending message to recipient
 * @name POST/
 */
messagesRouter.post('/', (req, res) => {
  const { sender, recipient, message } = req.body;

  if (!sender || !recipient || !message) {
    return res
      .status(200)
      .json('sender, recipient, message must be included in JSON payload');
  }

  const sentMessage = fakeDb.sendMessage(sender, recipient, message);

  res.json(sentMessage);
});

/**
 * Route for getting recipeint's recent messages for a recipient from a specific sender
 * @name GET/recipient/:recipientId/sender/:senderId
 */
messagesRouter.get('/recipient/:recipientId/sender/:senderId', (req, res) => {
  const { recipientId, senderId } = req.params;
  const { allRecent } = req.query;

  if (!senderId || !recipientId) {
    return res
      .status(200)
      .json('recipientId, senderId route parameters must be included');
  }
  if (isNaN(Number(senderId)) || isNaN(Number(recipientId))) {
    return res
      .status(200)
      .json('senderId, recipientId route parameters must be a number');
  }

  const messages = fakeDb.fetchRecentMessages(
    Number(recipientId),
    Number(senderId),
    allRecent === 'true'
  );

  res.json(messages);
});

/**
 * Route for getting recipient's recent messages for all senders
 * @name GET/recipient/:recipientId
 */
messagesRouter.get('/recipient/:recipientId', (req, res) => {
  const { recipientId } = req.params;
  const { allRecent } = req.query;

  if (!recipientId) {
    return res.status(200).json('recipientId route parameter must be included');
  }
  if (isNaN(Number(recipientId))) {
    return res.status(200).json('recipientId route parameter must be a number');
  }

  const messages = fakeDb.fetchAllRecentMessages(
    Number(recipientId),
    allRecent === 'true'
  );

  res.json(messages);
});

module.exports = messagesRouter;
