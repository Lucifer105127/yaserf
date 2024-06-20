module.exports.config = {
    name: "x",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "Kanichi",
    description: "leave the bot from a thread",
    commandCategory: "Admin",
    usePrefix: false,
    usages: "x [id]",
    cooldowns: 10,
};

module.exports.run = async function({ api, event, args }) {
        if (!args[0]) return api.removeUserFromGroup(api.getCurrentUserID(), event.threadID);
        if (!isNaN(args[0])) return api.removeUserFromGroup(api.getCurrentUserID(), args.join(" "));
}
