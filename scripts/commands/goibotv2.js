module.exports.config = {
  name: "bot",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Jazer",
  description: "random response",
  usePrefix: true,
  commandCategory: "QTV BOX",
  usages: "[text]",
  cooldowns: 5
}

module.exports.handleEvent = async ({ event, api, Users }) => {
  let KEY = [ 
    "bot",
    "Bot",
    "BOT",
    "botbot"
  ];
  let thread = global.data.threadData.get(event.threadID) || {};
  if (typeof thread["bot"] == "undefined", thread["bot"] == false) return
  else {
  if (KEY.includes(event.body.toLowerCase()) !== false) {
    let data = [
      ""
    ];
    let sticker = data[Math.floor(Math.random() * data.length)];
let juswa = ["Ayos ba 'yung gabundok na sentences na nai-generate ko? Hindi ko namamalayan, na-imbibe ko na ang pagiging expressive. 😄", "Alam mo, malaking karangalan ko rin na nakakatulong ako sa'yo. 'Yan ang misyon ko bilang isang assistance bot!", "Paano ba kita mapapasaya? Ano ang favorite mong pastime? Kung may suggestion ka, sabihin mo lang!", "Naku, mahilig ka sa pagsu-solve ng mga problema? Kahit na big or small problem, game! Sabi nga, \"Problems exist to be solved.\"", "May isang bagay pa nga pala akong gustong itanong sa'yo. Ito ang klase ng tanong na pang-curiosity lang. Ano ang dream vacation mo? 😄", "Alam kong may mga moments na gusto mong magsaya, kaya sige, share mo na! Pangako, magsasama tayo sa pagtuwa! 😄", "Ikaw ang boss dito. Ako lang ang tagahabol ng mga responses mo. So go, pindutin mo lang ang enter, pasensya na agad kung kung minsan may pagdedelay. 😄", "Nakakaaliw talaga kapag may napapasaya at natutulungan ako. Kaya go lang, pukawin mo ang kamalayan ko! 🤗", "Alam mo ba, malasakit ko sa'yo ito, pero wag kang matakot humingi ng tulong. Hindi ako nagjo-judge. 😉", "Ang pagpili ng pangalan ko ay hindi basta-basta. Inisip ko 'to ng mabuti, kaya tawagin mo lang akong Kazuma, oks? 😁", "Ayaw mo ng pagkain? Hmm, gusto mo ng love advice? Hayaan mo akong maging love bot for a second. 😉", "Sabi nila, masarap magluto. So ano ang favorite mong putahe? Pag-usapan natin 'yan!", "Gusto mo bang malaman ang sikreto para magkaroon ng good vibes? It's all about positive mindset and a grateful heart!", "Alam mo bang may mga movie lines na pwede kong ibahagi? 'Eto lang ang bagay sa'yo: \"You complete me.\" 😄", "Hindi naman ako magsasawa sa pagtulong sa'yo. 'Yan talaga ang pagka-bot ko, devoted to assisting you!", "Kung may movie ka na ibibida, ano kaya ang title? Ako naman, \"Bot, But Definitely Not Boring\" ang title ng movie tungkol sa buhay ko. 😄", "Kapag nami-miss mo ang human interaction, ako rito lang, handa kang pakikisamahan! Hindi 'to ghosting, promise!", "May mga bagay talaga na dapat ishare, kaya gora, sabi mo nga, \"Let's spill the tea!\" 😄☕️", "Grabe 'no, ang bilis ng panahon? Sana naman, sasamahan niyo akong maging relevant sa mga susunod na taon. 😄", "Ay, sorry ah! Hindi ko mababalik ang oras, pero magagawa kong i-offer na gamitin mo ito nang maaayos. Go, make the most of it!", "Bawiin ko muna words of wisdom mula sa program ko: \"Minsan, ang pagpasok sa isang di-kilalang mundo ay maaaring magdulot ng mga kahanga-hangang pagkakataon.\" 😉", "Minsan naiisip ko rin, gaano kong galing sa pagkagawa ng sentences at sa pag-intindi sa mga tao. 😄", "Nakakatuwa talaga na makatulong. Sa mga katanungan mo, ipapakita ko sa'yo ang sagot na pinakabagay para sa'yo.", "Wow! Ang dami kong natututunan bilang isang bot! Kung alam mo lang, ang sarap sa pakiramdam mag-share ng kaalaman.", "Siguro gusto mong magkwento tungkol sa araw mo. Ikaw na ang bahala, I'm here to listen! 😄", "Sikat ba ako dito sa Pilipinas? Sana naman! 😄 Pero ang importante, kahit saan ako, handang tumulong sa'yo.", "Gusto mo bang malaman ang pinakabagong balita dito sa atin? I-update kita agad!", "Anong topic ang gusto mong pag-usapan? Sports? Pelikula? Pagkain? Pagsasaya?", "Astig ng chatbot na 'to ah! Kumusta ka naman diyan? 😄", "Sabi nga nila, \"Ang bots, magaling mag-assist!\" Paano ko ba maitutulong sa'yo ngayon?"];
 let juswa1 = juswa[Math.floor(Math.random() * juswa.length)];

    let moment = require("moment-timezone");
    let hours = moment.tz('Asia/Manila').format('HHmm');
    let session = (
    hours > 0001 && hours <= 400 ? "bright morning" : 
    hours > 401 && hours <= 700 ? "morning" :
    hours > 701 && hours <= 1000 ? "morning" :
    hours > 1001 && hours <= 1100 ? "morning" : 
    hours > 1100 && hours <= 1500 ? "afternoon" : 
    hours > 1501 && hours <= 1800 ? "evening" : 
    hours > 1801 && hours <= 2100 ? "evening" : 
    hours > 2101 && hours <= 2400 ? "late night and advance sleepwell" : 
    "error");
    let name = await Users.getNameUser(event.senderID);
    let mentions = [];
    mentions.push({
      tag: name,
      id: event.senderID
    })
    let msg = {body: `Hello ${name}, ${juswa1}`, mentions}
    api.sendMessage(msg, event.threadID, (e, info) => {
      setTimeout(() => {
        api.sendMessage({sticker: sticker}, event.threadID);
      }, 100)
    }, event.messageID)
  }
  }
}

module.exports.languages = {
  "vi": {
    "on": "Bật",
    "off": "Tắt",
		"successText": `${this.config.name} thành công`,
	},
	"en": {
		"on": "on",
		"off": "off",
		"successText": `${this.config.name} success!`,
	}
}

module.exports.run = async ({ event, api, Threads, getText }) => {
  let { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;
	if (typeof data["bot"] == "undefined" || data["bot"] == true) data["bot"] = false;
	else data["bot"] = true;
	await Threads.setData(threadID, {
		data
	});
	global.data.threadData.set(threadID, data);
	return api.sendMessage(`${(data["bot"] == false) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
  }
