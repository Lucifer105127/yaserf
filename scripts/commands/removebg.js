const axios = require('axios');
const fs = require('fs-extra');

module.exports.config = {
  name: "removebg",
  version: "2.7",
  hasPermission: 0,
  credits: "Hazeyy",
  description: "( 𝚁𝚎𝚖𝚘𝚟𝚎 𝙱𝚊𝚌𝚔𝚐𝚛𝚘𝚞𝚗𝚍 )",
  commandCategory: "𝚗𝚘 𝚙𝚛𝚎𝚏𝚒𝚡",
  usePrefix: false,
  usages: "( 𝚁𝚎𝚖𝚘𝚟𝚎 𝙱𝚊𝚌𝚔𝚐𝚛𝚘𝚞𝚗𝚍 𝙿𝚑𝚘𝚝𝚘 )",
  cooldown: 3,
};

module.exports.handleEvent = async function ({ api, event }) {
  try {
    if (!(event.body.indexOf("removebg") === 0 || event.body.indexOf("Removebg") === 0)) return;

    const args = event.body.split(/\s+/);
    args.shift();

    let pathie = __dirname + `/cache/removed_bg.jpg`;
    const { threadID, messageID } = event;

    let photoUrl = event.messageReply ? event.messageReply.attachments[0].url : args.join(" ");

    if (!photoUrl) {
      api.sendMessage("Please reply to a photo to process and to remove backgrounds.", threadID, messageID);
      return;
    }

    api.sendMessage("removing background, please wait...", threadID, async () => {
      try {
        const response = await axios.get(`https://allinoneapis-jgyx.onrender.com/api/try/removebg?url=${encodeURIComponent(photoUrl)}`);
        const processedImageURL = response.data.image_data;

        const img = (await axios.get(processedImageURL, { responseType: "arraybuffer" })).data;

        fs.writeFileSync(pathie, Buffer.from(img, 'binary'));

        api.sendMessage({
          body: "✨ here's your image without background",
          attachment: fs.createReadStream(pathie)
        }, threadID, () => fs.unlinkSync(pathie), messageID);
      } catch (error) {
        api.sendMessage(`🔴 𝙴𝚛𝚛𝚘𝚛 𝚙𝚛𝚘𝚌𝚎𝚜𝚜𝚒𝚗𝚐 𝚒𝚖𝚊𝚐𝚎: ${error}`, threadID, messageID);
      }
    });
  } catch (error) {
    api.sendMessage(`𝖤𝗋𝗋𝗈𝗋: ${error.message}`, event.threadID, event.messageID);
  }
};

module.exports.run = async function ({ api, event }) {};
