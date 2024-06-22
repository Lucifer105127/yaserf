const tab = require('ultimate-guitar');

module.exports = {
  eurix: {
    name: "chords",
    credits: "Mark Andrie Dioso", 
    version: "4.0",
    description: "Get chords for the current song",
    permission: 0,
    usages: "[ song title ]",
    usePrefix: false,
    cooldown: 5,
  },
  execute: async function ({ reply, event, args }) {
    try {
      const song = args.join(" ");
      if (!song) return reply("No query provided");
      const chord  = await tab.firstData(song);
      const chordInfo = `${song} by ${chord.artist}\nKey: ${chord.key}\nChords: ${chord.chords}`;
      return reply(chordInfo);
    } catch (e) {
      return reply(e.message);
    }
  }
};