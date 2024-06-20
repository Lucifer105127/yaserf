module.exports.config = {
    name: "mistral",
    version: "2.0.1",
    hasPermssion: 0,
    credits: "Jazer Dmetriov",
    usePrefix: true,
    description: "Mitral ai",
    commandCategory: "ai",
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
        const res = await axios.get(`https://easy-api.online/ai/mistral?q=${content}`);
        const respond = res.data.content;
        const z = res.data.requests_count;
        if (res.data.error) {
            api.sendMessage(`Error: ${res.data.error}`, tid, (error, info) => {
                if (error) {
                    console.error(error);
                }
            }, mid);
        } else {
            api.sendMessage(`${respond}\n\n📰 request count : ${z}`, tid, (error, info) => {
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
