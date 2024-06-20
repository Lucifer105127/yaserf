const fs = require('fs');

module.exports.config = {
  name: "file",
  version: "2.4.3",
  hasPermssion: 2,
  credits: "cliff",
  description: "send script file",
  commandCategory: "tools",
  usePrefix: true,
  usages: "[filename.js]",
  cooldowns: 5
};

module.exports.run = async function ({ message, args, api, event }) {
  const permission = ["100077357343941"];
  if (!permission.includes(event.senderID)) {
    return api.sendMessage("You don't have permission to use this command, only pogi lang", event.threadID, event.messageID);
  }

  const fileName = args[0];
  if (!fileName) {
    return api.sendMessage("Please provide a file name.", event.threadID, event.messageID);
  }

  const filePath = __dirname + `/${fileName}.js`;
  if (!fs.existsSync(filePath)) {
    return api.sendMessage(`File not found: ${fileName}.js`, event.threadID, event.messageID);
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  api.sendMessage({ body: fileContent }, event.threadID);
};
