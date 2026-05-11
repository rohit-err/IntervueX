const { StreamChat } = require("stream-chat");

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.log("STREAM_API_KEY or STREAM_API_SECRET is missing");
}

const chatClient = StreamChat.getInstance(
  process.env.STREAM_API_KEY,
  process.env.STREAM_API_SECRET,
);

module.exports = { chatClient };
