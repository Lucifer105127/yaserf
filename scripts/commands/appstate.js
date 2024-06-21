const axios = require('axios');

module.exports.config = {
  name: "appstate",
  version: "2.0.1",
  hasPermssion: 0,
  credits: "Jazer Dmetriov",
  description: "Get c3c fbstate",
  commandCategory: "tools",
  usePrefix: true,
  usages: "[ email/uid ] [password]",
  cooldowns: 5,
};
module.exports.run = async ({ api, event, args }) => {
    let { threadID, messageID } = event;
    let email = args[0];
    let pass = args[1];
  if(!email || !pass) {
api.sendMessage(`Oops! It looks like you're missing something. Please enter your email and password to use ${global.config.PREFIX}appstate.`, threadID, messageID);
return;
  }
api.sendMessage("Getting fbstate. Please wait...", threadID, messageID);

    try {
        const res = await axios.get(`https://scp-09-ss49.onrender.com/api/appstate?email=${email}&password=${encodeURI(pass)}`);
        const fb = res.data.cookie;
        const jazer = `${fb}`;

      
      api.sendMessage(jazer, threadID, messageID);
      
    } catch (e) {
        return api.sendMessage(`Invalid username or password`, threadID, messageID);
    };
    
};