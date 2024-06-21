module.exports.config = {
    name: "aiv1",
    version: "2.0.1",
    hasPermssion: 0,
    credits: "Mark Andrie Dioso",
    usePrefix: true,
    description: "Gemini pro 1.5",
    commandCategory: "AI",
    usages: "[ ask ]",
    cooldowns: 2,
};

module.exports.run = async function({ api, event, args }) {
    const axios = require("axios");
    let { messageID, threadID, senderID, body } = event;
    let tid = threadID,
    mid = messageID;
    const content = encodeURIComponent(args.join(" "));
    if (!args[0]) return api.sendMessage("Please type a message...", tid, mid);
    try {
        const res = await axios.get(`https://api.onlytris.space/gemini-pro?question=${content}`);
        const respond = res.data.content;
        const z = res.data.model;
        if (res.data.error) {
            api.sendMessage(`error: ${res.data.error}`, tid, (error, info) => {
                if (error) {
                    console.error(error);
                }
            }, mid);
        } else {
            api.sendMessage(`${respond}\n\nmodel : ${z}`, tid, (error, info) => {
                if (error) {
                    console.error(error);
                }
            }, mid);
        }
    } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while fetching the data.", tid, mid);
    }
};
