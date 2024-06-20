module.exports.config = {
	name: "resetsqlite",
	version: "7.0.0",
	hasPermssion: 2,
	credits: "ryuko",
  usePrefix: true,
	description: "reset database",
	commandCategory: "operator/admin",
	usages: "[shell]",
	cooldowns: 0,
	dependencies: {
		"child_process": "",
    "process": ""
	}
};
module.exports.run = async function({ api, event, args, Threads, Users, Currencies, models, getText }) {  
let operator = global.config.OPERATOR;
            if (!operator.includes(event.senderID)) return api.sendMessage(`only bot operators can use this command.`, event.threadID, event.messageID);
const { exec } = require("child_process");
const process = require("process");
const { threadID, messageID } = event;
let text = args.join(" ")
exec(`rm -rf ../../ryuko/system/datasqlite/ryuko.sqlite`, (error, stdout, stderr) => {
    if (error) {
        api.sendMessage(`error : \n${error.message}`, event.threadID, event.messageID);
        return;
    }
    if (stderr) {
        api.sendMessage(`stderr : ${stderr}`, event.threadID, event.messageID);
        return;
    }
    return api.sendMessage(`reset database successfully, restarting please be patient.`, threadID, (e, info) => {
      setTimeout(() => {
        process.exit(1)
      }, 500)
  });
});
}
