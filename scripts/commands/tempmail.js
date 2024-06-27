const axios = require("axios");

module.exports.config = {
  name: "tempmail",
  version: "2.0",
  hasPermission: 0,
  credits: "remake by andrie",
  usePrefix: true,
  commandCategory: "utility",
  description: "Generate random email",
  usage: "[ temp ]",
  cooldowns: 2
};

module.exports.run = async ({
  api: api,
  event: event
}) => {
  try {
    const andrie = await axios.get('https://andrie.vercel.app/api/gen');
    const mail = andrie.data;
    if (!mail.email) {
      return api.sendMessage("failed to generate temporary email", event.threadID);
    }
    api.sendMessage(`🏷️ email : ${email.replace(".com", "()com")}`, event.threadID);
} catch (error) {
  console.error("error generating temporary email", error);
  api.sendMessage("An error occured while generating temporary email, please contact the owner.", event.threadID);
}
