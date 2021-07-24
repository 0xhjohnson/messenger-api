# Simple Messenger API

A simple messenger API that would enable a web app to build a simple messenger application.

## Prerequisites

Node.js must be installed. If you are using [nvm](https://github.com/nvm-sh/nvm) then run `nvm use` to use the recommended node version (14.17.3).

## Run Locally

Clone the project

```bash
git clone https://github.com/0xhjohnson/messenger-api.git
```

Go to the project directory

```bash
cd messenger-api
```

Install dependencies

`yarn` or `npm install`

Start the API

`yarn start` or `npm run start`

API should now be up and running locally on port 3000.

## API Reference

### Send message

```http
POST /api/messages/
```

Example: Create – POST http://localhost:3000/api/messages

Request body:

```json
{
  "sender": 1,
  "recipient": 2,
  "message": "message contents go here"
}
```

### Get recent messages from all senders

```http
GET /api/messages/recipient/:recipientId
```

Example: http://localhost:3000/api/messages/recipient/:recipientId

| Parameter     | Type     | Description                                     |
| :------------ | :------- | :---------------------------------------------- |
| `recipientId` | `number` | **Required**. Recipient ID of messages to fetch |

Fetches recent messages for a recipient from all senders - with a limit of 100 messages or all messages in last 30 days depending on `allRecent` query parameter.

### Get recent messages from a specific sender

```http
GET /api/messages/recipient/:recipientId/sender/:senderId
```

Example: http://localhost:3000/api/messages/recipient/:recipientId/sender/:senderId

| Parameter     | Type      | Description                                     |
| :------------ | :-------- | :---------------------------------------------- |
| `recipientId` | `number`  | **Required**. Recipient ID of messages to fetch |
| `senderId`    | `number`  | **Required**. Sender ID of messages to fetch    |
| `allRecent`   | `boolean` | Whether to display all messages in last 30 days |

Fetches recent messages for a recipient from a specific sender - with a limit of 100 messages or all messages in last 30 days depending on `allRecent` query parameter.

## Running Tests

To run tests, run the following command

`yarn test` or `npm run test`

## Design decisions

Would normally setup a PostgreSQL database rather than just storing the messages in-memory (array) but that seemed outside the scope of this project. If your curious how I'd go about that feel free to ask.

I wanted to stick to the spec as closely as possible so I decided on an `allRecent` (boolean) query param for limiting the number of messages. Another alternative is to have a `limit` (number) query param that way the API user could specify their own limit rather than the arbitrary `100`.
