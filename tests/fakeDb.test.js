const dayjs = require('dayjs');
const { v4: uuidv4 } = require('uuid');
const { limitMessages } = require('../fakeDb');

describe('message limit', () => {
  test('limited to 100 messages by default', () => {
    let messages = [];

    for (let i = 0; i < 150; i++) {
      messages.push({
        id: uuidv4(),
        sender: 1,
        recipient: 2,
        message: 'test message',
        timestamp: new Date().toISOString()
      });
    }

    const filteredMessages = limitMessages(messages, false);
    expect(filteredMessages).toHaveLength(100);
  });
  test('not limited to 100 messages when allRecent param is set', () => {
    let messages = [];

    for (let i = 0; i < 175; i++) {
      messages.push({
        id: uuidv4(),
        sender: 1,
        recipient: 2,
        message: 'test message',
        timestamp: new Date().toISOString()
      });
    }

    const filteredMessages = limitMessages(messages, true);
    expect(filteredMessages).toHaveLength(175);
  });
  test('limited to messages from last 30 days when allRecent param is set', () => {
    let messages = [];

    for (let i = 0; i < 100; i++) {
      messages.push({
        id: uuidv4(),
        sender: 1,
        recipient: 2,
        message: 'test message',
        timestamp: dayjs().subtract(i, 'day').format()
      });
    }

    const filteredMessages = limitMessages(messages, true);
    const timestampThirtyDaysAgo = dayjs().subtract(30, 'day').format();
    expect(filteredMessages[filteredMessages.length - 1].timestamp).toEqual(
      timestampThirtyDaysAgo
    );
  });
});
