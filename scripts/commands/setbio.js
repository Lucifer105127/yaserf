module.exports.config = {
	name: "bio",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "Deku",
	description: "Change the bio of bot.",
  usePrefix: true,
	commandCategory: "...",
	usages: "[args]",
  cooldowns: 1
}
  module.exports.run = async ({ api, event, args }) => {
    if (!args.join(" ")){ return api.sendMessage(`Use: ${this.config.name} [text]`, event.threadID, event.messageID)}
    else {
    api.changeBio(args.join(" "), (e) => {
      if(e) api.sendMessage("[ERR]:" + e, event.threadID); return api.sendMessage("Bot bio has been successfully changed to:"+args.join(" "), event.threadID, event.messgaeID)
    
    }
    )
  }
  }