module.exports.config = {
	name: "chords",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Joshua Sy",
	description: "search chords",
  usages: "[Title]",
  usePrefix: false,
	commandCategory: "...",
	cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  const { threadID, messageID } = event;
  const song = args.join(" ");

  if (!song) {
    return api.sendMessage("Please provide a song name.", threadID, messageID);
  }

  const apiUrl = `https://joshweb.click/search/chords?q=${encodeURIComponent(song)}`;

  try {
    const response = await axios.get(apiUrl);
    const { artist, title, Chords } = response.data.chord;

    if (!artist || !title || !Chords) {
      return api.sendMessage("Song information not found.", threadID, messageID);
    }

    const chordMessage = `Artist: ${artist}\nTitle: ${title}\nChords:\n${Chords}`;
    api.sendMessage(chordMessage, threadID, messageID);
  } catch (error) {
    console.error(error);
    api.sendMessage("An error occurred while fetching song information. Please try again later.", threadID, messageID);
  }
};
