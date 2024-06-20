module.exports.config = {
  name: "ping",
  version: "1.0",
  hasPermission: 0,
  credits: "Aki Hayakawa",
  usePrefix: false,
  description: "checking the ping",
  commandCategory: "system",
  usages: "",
  cooldowns: 0,
};

module.exports.run = async ({ api, event }) => {
  let time = process.uptime();
  let hours = Math.floor(time / (60 * 60));
  let minutes = Math.floor((time % (60 * 60)) / 60);
  let seconds = Math.floor(time % 60);
  const timeStart = Date.now();
  
  return api.sendMessage('', event.threadID, (err, info) => {
    setTimeout(() => {
      const hoursString = hours === 1 ? "hour" : "hours";
      const minutesString = minutes === 1 ? "minute" : "minutes";
      const secondsString = seconds === 1 ? "second" : "seconds";

      const uptimeString = `${hours > 0 ? `${hours} ${hoursString} ` : ''}${minutes > 0 ? `${minutes} ${minutesString} ` : ''}${seconds} ${secondsString}`;

      api.sendMessage(`Pong! ${(Date.now() - timeStart)}ms`, event.threadID, event.messageID);
    }, 200);
  }, event.messageID);
};
