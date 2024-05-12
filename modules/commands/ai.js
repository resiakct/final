const axios = require('axios');
const moment = require('moment-timezone');

module.exports.config = {
  name: 'ai',
  version: '1.0.0',
  role: 0,
  usePrefix: false,
  commandCategory: "ai",
  aliases: ['snow', 'ai'],
  description: "An AI command powered by Snowflakes AI",
  usage: "snowflakes [prompt]",
  credits: 'churchill,modified by joshua apostol',
  cooldown: 3,
};

module.exports.run = async function({ api, event, args }) {
  const input = args.join(' ');
  const timeString = moment.tz('Asia/Manila').format('LLL');

  if (!input) {
    api.sendMessage(`𝗥⃪𝗘⃪𝗦⃪𝗣⃪𝗢⃪𝗡⃪𝗗⃪ 𝗔⃪𝗜⃪\n\nPlease provide a question/query.`, event.threadID, event.messageID);
    return;
  }

  api.sendMessage(`🔍Searching for Snowflakes AI response....`, event.threadID, event.messageID);

  try {
    const { data } = await axios.get(`https://hashier-api-snowflake.vercel.app/api/snowflake?ask=${encodeURIComponent(input)}`);
    if (data.response) {
      api.sendMessage(`𝗥⃪𝗘⃪𝗦⃪𝗣⃪𝗢⃪𝗡⃪𝗗⃪ 𝗔⃪𝗜⃪\n━━━━━━━━━━━━━━━\n\n${data.response}\n\n${timeString}`, event.threadID, event.messageID);
    } else {
      api.sendMessage('No response found.', event.threadID, event.messageID);
    }
  } catch (error) {
    api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};