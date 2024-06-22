const axios = require('axios');

module.exports.config = {
  name: "inbox",
  version: "1.0.0",
  credits: "RICKCIEL",
  hasPermission: 0,
  usePrefix: true,
  description: "Fetch and display inbox messages for tempmail only.",
  commandCategory: "Utility",
  cooldowns: 5,
};

module.exports.run = async ({ api, event, args }) => {
  try {
    const emailAddress = args[0];
    const inboxResponse = await axios.get(`https://andrie.vercel.app/api/getmessage/${emailAddress}`);
    const messages = inboxResponse.data.messages;

    if (!messages || messages.length === 0) {
      return api.sendMessage(`No messages found for ${emailAddress}.`, event.threadID);
}
    let messageText = `Inbox Messages for: ${emailAddress}`;
    for (const message of messages) {
      messageText += `\n\n₪. From: ${message.sender}\n`;
      messageText += ` Subject: ${message.subject || 'NO SUB'}\n  Date: ${message.date}\n  Id: ${message.id}\nOwner: https://www.facebook.com/devs150`;
    }

    api.sendMessage(messageText, event.senderID);
    api.sendMessage("Message sent to your inbox. Kindly check your spam.", event.threadID);
  } catch (error) {
    console.error('Error fetching inbox:', error);
    api.sendMessage("An error occurred while fetching the inbox, please try again.", event.threadID);
  }
};
