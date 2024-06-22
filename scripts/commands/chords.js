const tab = require('ultimate-guitar');

module.exports.config = {
    name: "chords",
    credits: "Mark Andrie Dioso", 
    version: "4.0",
    description: "Get chords for the current song",
    hasPermission: 0,
    commandCategory: "music",
    usages: "[ song title ]",
    usePrefix: false,
    cooldowns: 5,
  };
module.exports.run = async function ({ api, event, args }) {
    try {
      const song = args.join(" ");
      if (!song) return reply("No query provided");
      const chord  = await tab.firstData(song);
      const chordInfo = `${song} by ${chord.artist}\nKey: ${chord.key}\nChords: ${chord.chords}`;
      api.sendMessage(chordInfo, event.threadID, event.messageId);
    } catch (e) {
      console.error(e);
      api.sendMessage(e.message, event.threadID, event.messageId);
    }
  }
};