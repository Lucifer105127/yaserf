const axios = require("axios");
const fs = require('fs');
const path = require('path');

module.exports.config = {
    name: "imgsearch",
    version: "1",
    usePrefix: false,
    credits: "1SOY DEV",
    usage: "imgsearch query",
    description: "Search for an image on Google",
    hasPermission: 0,
    commandCategory: "Google",
    cooldowns: 2
};

module.exports.run = async function ({ api, event, args }) {
    const query = args.join(" ");

    async function performImageSearch() {
        try {
            if (!query) {
                api.sendMessage("Please Provide A Query...", event.threadID, event.messageID);
                return;
            }

            api.sendMessage("Searching Image🔍, Please Wait.....", event.threadID, event.senderID);

            const res = await axios.get(`https://easy-api.online/api/gimage?q=${query}`);
            const imgUrls = res.data.data;
            const imgCount = imgUrls.length;

            if (imgCount === 0) {
                api.sendMessage(`No image results found for "${query}"`, event.threadID, event.messageID);
                return;
            }

            const randomIndices = getRandomIndices(imgCount, Math.min(10, imgCount));
            const attachments = [];

            for (let i = 0; i < randomIndices.length; i++) {
                const index = randomIndices[i];
                const url = imgUrls[index];

                try {
                    const imageResponse = await axios.get(url, { responseType: "arraybuffer" });
                    const imagePath = path.join(__dirname, `cache`, `imgsearch_${i}.png`);
                    fs.writeFileSync(imagePath, imageResponse.data);
                    attachments.push(fs.createReadStream(imagePath));
                } catch (error) {
                    console.log(error);
                    api.sendMessage(error, event.threadID, event.messageID);
                }
            }

            api.sendMessage({
                body: `This is the 10 random Image Result \nTotal Result of ${imgCount}`,
                attachment: attachments,
            }, event.threadID, event.messageID);

        } catch (error) {
            api.sendMessage('Error during image search', event.threadID, event.messageID);
        }
    }

    performImageSearch();
};

function getRandomIndices(max, count) {
    const indices = Array.from({ length: max }, (_, i) => i);
    for (let i = max - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices.slice(0, count);
  }
