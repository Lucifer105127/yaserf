const axios = require('axios');
const { Readable } = require('stream');

module.exports.config = {
  name: "meme",
  version: "1.0",
  hasPermission: 0,
  credits: "Rickciel",
  usePrefix: true,
  description: "Generate a random meme",
  commandCategory: "Fun",
  cooldowns: 2,
};

module.exports.run = async ({ api, event, args }) => {
  try {
    const response = await axios.get('https://jayapi.onrender.com/memeapi', {
      responseType: 'stream', 
    });

    
    api.sendMessage(
      {
        body: "Here's a random meme for you:",
        attachment: response.data, 
      },
      event.threadID
    );
  } catch (error) {
    console.error(error);
    api.sendMessage("Error fetching memes.", event.threadID, event.messageID);
  }
};
 
