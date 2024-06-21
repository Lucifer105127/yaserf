const axios = require("axios");

const config = {
  name: "ai",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Jazer",
  description: "OpenAI official AI with no prefix",
  commandCategory: "ai",
  usePrefix: false,
  usages: "...",
  cooldowns: 0
};

const handleEvent = async function ({ api, event, client, __GLOBAL }) {

  if (event.body.indexOf("ai") === 0 || event.body.indexOf("Ai") === 0) {
    const { threadID, messageID } = event;
    const input = event.body;
    const uid = event.senderID;
    const message = input.split(" ");

    if (message.length < 2) {
      api.sendMessage("Please provide a question first.", event.threadID, event.messageID);
    } else {
      try {
        api.sendMessage('Please wait while I think through your request...', event.threadID, event.messageID);
        const ris = await axios.get(`https://akhiro-rest-api.onrender.com/api/gpt4?q=${message.slice(1).join(" ")}`);
        const result = ris.data.content;
        const a = "credits: www.facebook.com/dre.xyz0";
        const jazer = `𝗞𝗔𝗭𝗨𝗠𝗔 🤖: \n\n${result}\n\nuid: ${uid}`;
        api.sendMessage(jazer, event.threadID, event.messageID);
      } catch (err) {
        console.error(err);
        api.sendMessage("An error occurred while fetching the data from API.", event.threadID, event.messageID);
      }
    }
  }
};

const run = function ({ api, event, client, __GLOBAL }) {
};

module.exports = { config, handleEvent, run };
