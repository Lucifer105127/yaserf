const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const KievRPSSecAuth = "FACKBBRaTOJILtFsMkpLVWSG6AN6C/svRwNmAAAEgAAACCk69FoU851gSARfIYTJdxHBEn8u9+URBYSjZKWEA/h9uq1jj2Q8zxWCvdpx/+xTehwFBxq2ZNgyS7krVOYgL4IecnQde4DOrpDBcqBmXNaW7gio4q8BFT7G1zLmwDprvF8TgYAdm77XdLWe/h55g2LzoB0F9Pf95by4dq8WDnEBHnQRyvunGdJbznPbsFTQK+9nX+K3yhfnQrDLKt1OEu5D2l6ySldag+9GO25eziUWmXWLM/UOKJo0xz57OH6Aq8dl9SO+iLNbnj15z5VNmGeaF8UcY7XoR0BjD9S+n3+Bk8N4EFLo4FwjtrJl1/UdzJtkGAM6bw8Zk1BCDschiBCBKCU+Coj0PqCtYiy213cUzk85TDgeMaFAeGXHI3G1UpYMTucQTWVVDUHLojlFilh1lcB4EtkMxLf7j4OLtHG++TdibWWykcswH078fzq5zoQNtcpRFECVb3/ZDp4HlB3hlmUb9+eJkHffFlgbf7ib+F6DuHkEHKYdmXx/Hz2oMYM9uo9mHnsK5GbE/P5w8tC9lO6Rv3XnFJAbpP5j+KXBGu99dgjGnZ2ysvbwvnvTwAfTaVLiAF2BdyPihNYDf4qM6YipVmfBPakqK3Jfp4KQ9m33oGe4acNo2gp52YmRdXWBfr+1p+nJiUjqFHsUP3bIc6+UkD0H8UMK4gvw7WkFwm1GeIGTETlFuk+7e3CXzjeB+gWrM0Zjv6IJOuTJl8ePVWeBqXGoD/rq8ohkGcdlbuMKe3w+f/ZtuqmpImYoNyHh9510UIry8ikiq8qN2kj0L/dfN39SR7cq/5o7cBnwbRuoPUnL3Iy2Fz2g+jrRYbHwZuiHPn34safqXB89GP5PHypbTclJgr2VF0DeO7y70N8bGhjUgm3F/+Axm2tUWJe/ZmpPwLKOCZKsXgiL7pcWa2kR/+JlYqHtT7dGsoMsVyzvfYIbkqSESdqZhscpW6GuZtjCRNpHtxf3fXwLMjGd5EdF1T8YvNM+Zjc3eGkERc7s+H/zeeJBLtlsUbVAPckWCu8EW1/VaSC9V/DnWdIdk58fpu3ZhwxlpN0fK6DQL/mrftaZS0kOcTe14ObIdRfDf1SEa1+ERGI3uK+WEgJwOTzitvcO5FohV1kxAfjXGBiHlaB9G6YGaC1Q/BFkSCehaim4xXkstmm5X3IqnmwDZGNc6LKpmY0poB70A9MdiegeilgZDpEXL7ki2whlqoVXX8NIevupxTxQZfbgonOLmHzZvppqs3MIF/WHrya0Xm2g0QZdOchGVLnLzumAllavjKtmxRd1T/e+G7R81QPl6pkoZLHxDh2pATVdVHzD2XoPFj5Lv4zYJvXhZz1Pgn8pF/4Xip+I49jcNlN+v18JulLkrHStsJyePChENUVUjc528CU8luCLuMIsEf6SsQ3GelusYwK2yD3wObjJyphC+Vj7TTbvoRerJFZU7QBdKnFIECVkd+0yK/BEkfM+zyomFAAbcEsYWdc6jJ/PwT0Bak14vCxdiQ==";
const _U = "1l4xgxoQ1SaeQ4mJDJRwfOZsEeOWyFCHQ7j3P7h6xsATSZzIInoCp8dAIWmOPlAobzeoi-9yZrhtHjVppK2ok01BhwR3JKP9YWjKgD13QsMQdqADFXl3zKY94Bh-fgyT2H8s0at_T_g1aECX3kLPODUdSaI5b_YdBzsxamaSImuzWe9D6815_5ufEHntPA9dMQ6QWkah5uXrwgnJAixJc2aXaUk4b33emWco9nBHnbmI";

module.exports.config = {
	name: "dalle",
	version: "1.0",
  hasPermission: 0,
	credits: "cliff",//api by Samir
	usePrefix: true,
	description: "Dall-E 3.5 is an advanced version of the popular AI model DALL-E, developed by OpenAI. This cutting-edge AI is designed to generate images from textual descriptions, allowing users to describe a concept, and it will create a corresponding visual representation.",
	commandCategory: "fun",
	usages: "text",
	cooldowns: 0,
};

module.exports.run = async function ({ api, event, args }) {
	const keySearch = args.join(" ");
	const indexOfHyphen = keySearch.indexOf('-');
	const keySearchs = indexOfHyphen !== -1 ? keySearch.substr(0, indexOfHyphen).trim() : keySearch.trim();
	const numberSearch = parseInt(keySearch.split("-").pop().trim()) || 4;

	try {
		const res = await axios.get(`https://api-dalle-gen.onrender.com/dalle3?auth_cookie_U=${_U}&auth_cookie_KievRPSSecAuth=${KievRPSSecAuth}&prompt=${encodeURIComponent(keySearchs)}`);
		const data = res.data.results.images;

		if (!data || data.length === 0) {
			api.sendMessage("No images found for the provided query.", event.threadID, event.messageID);
			return;
		}

		const imgData = [];
		for (let i = 0; i < Math.min(numberSearch, data.length); i++) {
			const imgResponse = await axios.get(data[i].url, { responseType: 'arraybuffer' });
			const imgPath = path.join(__dirname, 'cache', `${i + 1}.jpg`);
			await fs.outputFile(imgPath, imgResponse.data);
			imgData.push(fs.createReadStream(imgPath));
		}

		await api.sendMessage({
			attachment: imgData,
			body: `Here's your generated image`
		}, event.threadID, event.messageID);

	} catch (error) {
		console.error(error);
		api.sendMessage("An unexpected error occurred: Auth cookie failed!", event.threadID, event.messageID);
	} finally {
		await fs.remove(path.join(__dirname, 'cache'));
	}
};
