const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports.config = {
  name: "autoban",
  version: "1.0",
  hasPermission: 0,
  credits: "RICKCIEL",
  usePrefix: true,
  description: "Get an autoban image.",
  commandCategory: "Fun",
  cooldowns: 2,
};

module.exports.run = async ({ api, event }) => {
  try {
    const response = await axios.get('https://sensui-useless-apis.codersensui.repl.co/api/fun/autobanfb');
    const imageUrl = response.data.image;

    const cacheFolderPath = path.join(__dirname, '..', 'cache');
    if (!fs.existsSync(cacheFolderPath)) {
      fs.mkdirSync(cacheFolderPath);
    }

    const imagePath = path.join(cacheFolderPath, 'autoban.jpg');
    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });

    fs.writeFileSync(imagePath, Buffer.from(imageResponse.data));

    const message = {
      attachment: fs.createReadStream(imagePath),
    };

    await api.sendMessage(message, event.threadID);

    fs.unlinkSync(imagePath); 
  } catch (error) {
    console.error('Error fetching autoban image:', error);
    api.sendMessage("Unable to fetch autoban image at the moment.", event.threadID);
  }
};
