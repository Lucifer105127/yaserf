const axios = require('axios');

module.exports.config = {
  name: "quotev2",
  version: "1.0.",
  hasPermission: 0,
  credits: "RICKCIEL",
  usePrefix: true,
  description: "GENERATE QUOTES",
  commandCategory: "Notes",
  cooldowns: 2,
};

module.exports.run = async ({ api, event }) => {
  try {
    const response = await axios.get('https://zenquotes.io/api/random');
    const quote = response.data[0];

    // Extract the quote text and author from the response
    const { q: quoteText, a: author } = quote;

    // Build the final quote message
    const message = `${quoteText} - ${author}`;

    // Send the quote as a message
    api.sendMessage(message, event.threadID, event.messageID);
  } catch (error) {
    console.error(error);
    api.sendMessage("Error fetching quotes.", event.threadID, event.messageID);
  }
};
