module.exports.config = {
  name: 'video',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'D-Jukie mod by chinhle',
  description: 'Play video via YouTube link or search keyword',
  commandCategory: 'Song/video',
  usages: '[searchVideos]',
  usePrefix: true,
  cooldowns: 10,
  dependencies: {
    'ytdl-core': '',
    'simple-youtube-api': '',
  },
}
module.exports.handleReply = async function ({
  api: e,
  event: a,
  handleReply: t,
}) {
  const n = global.nodemodule.axios,
    s = global.nodemodule['fs-extra'],
    i =
      (global.nodemodule.request,
      await n.get(
        'https://raw.githubusercontent.com/quyenkaneki/data/main/video.json'
      )),
    r = i.data.keyVideo.length,
    o = i.data.keyVideo[Math.floor(Math.random() * r)],
    {
      createReadStream: d,
      createWriteStream: m,
      unlinkSync: l,
      statSync: h,
    } = global.nodemodule['fs-extra']
  var c,
    u = a.body
  if (((c = u), isNaN(c) || c < 1 || c > 6)) {
    return e.sendMessage(
      'choose from 1 -> 6  baby.uwu \u2764️',
      a.threadID,
      a.messageID
    )
  }
  e.unsendMessage(t.messageID)
  try {
    var g = {
      method: 'GET',
      url: 'https://ytstream-download-youtube-videos.p.rapidapi.com/dl',
      params: { id: `${t.link[a.body - 1]}` },
      headers: {
        'x-rapidapi-host': 'ytstream-download-youtube-videos.p.rapidapi.com',
        'x-rapidapi-key': `${o.API_KEY}`,
      },
    }
    var p = (await n.request(g)).data,
      y = p.title
    if ('fail' == p.status) {
      return e.sendMessage('This file could not be sent.', a.threadID)
    }
    var f = Object.keys(p.link)[1],
      b = p.link[f][0]
    path1 = __dirname + '/data/1.mp4'
    const i = (await n.get(`${b}`, { responseType: 'arraybuffer' })).data
    return (
      s.writeFileSync(path1, Buffer.from(i, 'utf-8')),
      e.unsendMessage(t.messageID),
      s.statSync(__dirname + '/data/1.mp4').size > 26000000
        ? e.sendMessage(
            'The file could not be sent because it is larger than 25MB.',
            a.threadID,
            () => l(__dirname + '/data/1.mp4'),
            a.messageID
          )
        : e.sendMessage(
            {
              body: `» ${y}`,
              attachment: s.createReadStream(__dirname + '/data/1.mp4'),
            },
            a.threadID,
            () => s.unlinkSync(__dirname + '/data/1.mp4'),
            a.messageID
          )
    )
  } catch {
    return e.sendMessage('Unable to send this file!', a.threadID, a.messageID)
  }
  for (let e = 1; e < 7; e++) {
    l(__dirname + `/data/${e}.png`)
  }
}
module.exports.run = async function ({ api: e, event: a, args: t }) {
  const n = global.nodemodule.axios,
    s = global.nodemodule['fs-extra'],
    i =
      (global.nodemodule.request,
      await n.get(
        'https://raw.githubusercontent.com/quyenkaneki/data/main/video.json'
      )),
    r = i.data.keyVideo.length,
    o = i.data.keyVideo[Math.floor(Math.random() * r)],
    d =
      (global.nodemodule['ytdl-core'], global.nodemodule['simple-youtube-api']),
    {
      createReadStream: m,
      createWriteStream: l,
      unlinkSync: h,
      statSync: c,
    } = global.nodemodule['fs-extra']
  var u = [
    'AIzaSyB5A3Lum6u5p2Ki2btkGdzvEqtZ8KNLeXo',
    'AIzaSyAyjwkjc0w61LpOErHY_vFo6Di5LEyfLK0',
    'AIzaSyBY5jfFyaTNtiTSBNCvmyJKpMIGlpCSB4w',
    'AIzaSyCYCg9qpFmJJsEcr61ZLV5KsmgT1RE5aI4',
    'AIzaSyDC-PYP4E1bD2_RauVJBnTSkvUNxkxSQcc',
    'AIzaSyDBOpnGGz225cPwHlJQs8OMRtxOjSUm73I',
    'AIzaSyCbuOQhSRjfdkLOXkhyEo3nzbUHvQRsgkk',
    'AIzaSyCqox-KXEwDncsuo2HIpE0MF8J7ATln5Vc'
  ]
  const g = u[Math.floor(Math.random() * u.length)],
    p = new d(g)
  if (0 == t.length || !t) {
    return e.sendMessage(
      "\xBB The search section can't be done. Blank! ",
      a.threadID,
      a.messageID
    )
  }

  const y = t.join(' ')
  if (0 == t.join(' ').indexOf('https://')) {
    var f = {
      method: 'GET',
      url: 'https://ytstream-download-youtube-videos.p.rapidapi.com/dl',
      params: {
        id: t
          .join(' ')
          .split(
            /^.*(youtu.be\/|v\/|embed\/|watch\?|youtube.com\/user\/[^#]*#([^\/]*?\/)*)\??v?=?([^#\&\?]*).*/
          )[3],
      },
      headers: {
        'x-rapidapi-host': 'ytstream-download-youtube-videos.p.rapidapi.com',
        'x-rapidapi-key': `${o.API_KEY}`,
      },
    }
    var b = (await n.request(f)).data,
      v = b.title
    if ('fail' == b.status) {
      return e.sendMessage('This file could not be sent.', a.threadID)
    }
    var k = Object.keys(b.link)[1],
      I = b.link[k][0]
    path1 = __dirname + '/data/1.mp4'
    const i = (await n.get(`${I}`, { responseType: 'arraybuffer' })).data
    return (
      s.writeFileSync(path1, Buffer.from(i, 'utf-8')),
      s.statSync(__dirname + '/data/1.mp4').size > 26000000
        ? e.sendMessage(
            'The file could not be sent because it is larger than 25MB.',
            a.threadID,
            () => h(__dirname + '/data/1.mp4'),
            a.messageID
          )
        : e.sendMessage(
            {
              body: `» ${v}`,
              attachment: s.createReadStream(__dirname + '/data/1.mp4'),
            },
            a.threadID,
            () => s.unlinkSync(__dirname + '/data/1.mp4'),
            a.messageID
          )
    )
  }
  try {
    const t = global.nodemodule['fs-extra'],
      n = global.nodemodule.axios
    var w = [],
      _ = '',
      D = 0,
      S = 0,
      M = [],
      $ = await p.searchVideos(y, 6)
    for (let e of $) {
      if (void 0 === e.id) {
        return
      }
      w.push(e.id)
      e.id
      let a = __dirname + `/data/${(S += 1)}.png`,
        s = `https://img.youtube.com/vi/${e.id}/hqdefault.jpg`,
        i = (await n.get(`${s}`, { responseType: 'arraybuffer' })).data,
        r = (
          await n.get(
            `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${e.id}&key=${g}`
          )
        ).data.items[0].contentDetails.duration
          .slice(2)
          .replace('S', '')
          .replace('M', ':')
      ;(
        await n.get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${e.id}&key=${g}`
        )
      ).data.items[0].snippet.channelTitle
      if (
        (t.writeFileSync(a, Buffer.from(i, 'utf-8')),
        M.push(t.createReadStream(__dirname + `/data/${S}.png`)),
        1 == (D = D += 1))
      ) {
        var x = '\u24F5'
      }
      if (2 == D) {
        x = '\u24F6'
      }
      if (3 == D) {
        x = '\u24F7'
      }
      if (4 == D) {
        x = '\u24F8'
      }
      if (5 == D) {
        x = '\u24F9'
      }
      if (6 == D) {
        x = '\u24FA'
      }
      _ += `${x} 《${r}》 ${e.title}\n\n`
    }
    var j = `»🔎 There's ${w.length}list that coincides with your search keyword:\n\n\n${_}» Reply(reply in order number) select one of the searches above `
    return e.sendMessage(
      {
        attachment: M,
        body: j,
      },
      a.threadID,
      (e, t) =>
        global.client.handleReply.push({
          name: this.config.name,
          messageID: t.messageID,
          author: a.senderID,
          link: w,
        }),
      a.messageID
    )
  } catch (t) {
    return e.sendMessage(
      'The request could not be processed due to a module error: ' + t.message,
      a.threadID,
      a.messageID
    )
  }
  }