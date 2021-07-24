const { v4: uuidv4 } = require('uuid');
const dayjs = require('dayjs');

const users = [
  {
    id: 1,
    name: 'Hunter'
  },
  {
    id: 2,
    name: 'Val'
  },
  {
    id: 3,
    name: 'Mr. Robot'
  }
];

const messages = [];

/**
 * Limits messages to the last 30 days or a maximum of 100 results
 *
 * @param {Object[]} messages - Unfiltered array of messages
 * @param {boolean} allRecent - Whether to include all messages in last 30 days
 * @return {Object[]} Filtered array of messages
 */
const limitMessages = (messages, allRecent) => {
  if (allRecent) {
    // only include messages from the last 30 days
    return messages.filter((message) => {
      const currentTimestamp = dayjs();
      const timestamp = dayjs(message.timestamp);
      return currentTimestamp.diff(timestamp, 'day') <= 30;
    });
  }

  return messages.slice(0, 100);
};

/**
 * Fetch recipient's recent messages from all senders
 *
 * @param {number} recipientId
 * @param {boolean} allRecent - Diplays all messages from last 30 days if true, otherwise limit of 100
 * @return {Object[]} Filtered array of messages for recipient
 */
const fetchAllRecentMessages = (recipientId, allRecent) => {
  const recipientMessages = messages.filter(
    (message) => message.recipient === recipientId
  );
  return limitMessages(recipientMessages, allRecent);
};

/**
 * Fetch recipient's recent messages from a specific sender
 *
 * @param {number} recipientId
 * @param {number} senderId
 * @param {boolean} allRecent - Diplays all messages from last 30 days if true, otherwise limit of 100
 * @return {Object[]} Filtered array of messages for recipient
 */
const fetchRecentMessages = (recipientId, senderId, allRecent) => {
  const messagesFromSender = messages.filter(
    (message) =>
      message.sender === senderId && message.recipient === recipientId
  );
  return limitMessages(messagesFromSender, allRecent);
};

const sendMessage = (sender, recipient, message) => {
  const payload = {
    id: uuidv4(),
    sender,
    recipient,
    message,
    timestamp: new Date().toISOString()
  };

  messages.push(payload);

  return payload;
};

module.exports = {
  users,
  messages,
  sendMessage,
  fetchRecentMessages,
  fetchAllRecentMessages
};
