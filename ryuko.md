### ABOUT ME

```txt
name : Ryuko Developer
age : 17
need help? kindly click the facebook page bellow
```
 [ [FACEBOOK PAGE](https://www.facebook.com/profile.php?id=100094389684994) ]

```txt
this file was made by Ryuko Developer
```

### CONFIG AND CUSTOM
```txt
+ ryuko.js - configure auto restart and auto accept pending messages.
+ ryuko.json - configure bot name, bot prefix and admin bot.
+ ryukostate.json - account cache data.
```

### HOW TO ADD COMMANDS?
```js
module.exports.config = {
  name: "example", // command name.
  version: "1.0.0", // command version.
  hasPermssion: 0, // set to 1 if you want to set the permission into a group admins, set to 2 if you want to set the permission into a bot admins, set to 3 if you want to set the permission into a bot operators.
  credits: "ryuko",
  description: "example", // command description.
  usePrefix: false, // set to true if you want to use the command with prefix, set to false if you want to use the commands without prefix.
  commandCategory: "example", // command category.
  usages: "example", // command ussage.
  cooldowns: 5, // 5 seconds command cooldown.
  dependencies: {
		"name": "version" // not required but if the command have a npm packages, you can type the package name and version to automatically install the package.
	}
};

module.exports.run = async ({api, event, args}) => {
  // start coding
}
```

### CONFIG COMMAND
```txt
+ config.js - bot control

to control your bot account, go to new tab in replit and select secrets, name it to "configAppstate" and paste your fbstate into the value

after that message your bot using "config" then select the following number you want.

```

### HOW TO GET "RYUKOSTATE.JSON" DATA?
```txt
to get "ryukostate.json" data, please follow these steps :

step 1 : download fbstate exporter on "https://www.mediafire.com/file/vyy6jbo7ul2d3th/fbstate_exporter-1.0.xpi+(1).zip/file" 

step 2 : download kiwi browser from the play store.

step 3 : open kiwi browser and tap on the three dots at the top right corner.

step 4 : select "extensions" from the menu.

step 5 : tap on "+ from (.zip/ .crx/ .user.js)" and choose the file "fbstate_exporter-1.0.xpi (1).zip" that you downloaded.

step 6 : once the extension is added, go to "www.facebook.com" and log in to the account you want to use as a bot.

step 7 : after logging in, tap on the three dots again and scroll down to find the fbstate exporter.

step 8 : click on it and then click on "copy fbstate".

step 9 : paste the copied data into the "ryukostate.json" file.

step 10 : finally, click on "run" to initiate the bot.
```

### ALL COMMANDS
```txt
admin category :

accept
admin
adminnoti
allgroups
approve
group
join
language
react
restart
sendmsg
setdatagroup
setdatauser
user

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

without prefix category :

admins
biblesearch
brainly
andrea
google
grammar
gid
moneys
quotes
slot
talk
talkvm
teach
translate
uid
wattpad
weather
wiki

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

system category :

antispam
autoseen
greetings
prefix
resend

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

operator category :

command
config
friends
operator
operatornoti
post
resetsqlite

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

guide category :

help

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

with prefix category :

searchimage
pinterest
play
reminder
say
work

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

all comands : 51
```
### DESCRIPTION
```txt
Ryuko Facebook Messenger Bot is an advanced chatbot that operates within the Facebook Messenger platform. It incorporates cutting-edge technology to offer users a seamless and intuitive experience. One of its standout features is the "no prefix system," which means that you can interact with the bot without the need for specific commands or triggers.

With Ryuko, you can have natural and conversational interactions, just like chatting with a friend. Instead of using pre-defined keywords, you can ask questions, make requests, or provide queries in a free-flowing manner. The bot's robust natural language processing capabilities ensure that it understands and responds to your messages accurately and contextually.

Furthermore, Ryuko is equipped with enhanced commands that allow for more precise and efficient interactions. These commands enable you to perform specific tasks, access different functionalities, or retrieve targeted information. By using these enhanced commands, you can navigate through various features and options seamlessly, making your experience with Ryuko more tailored to your needs.

Overall, Ryuko aims to provide an engaging, user-friendly, and natural conversation experience within the Facebook Messenger platform. Its combination of the no prefix system and enhanced commands ensures that you can effortlessly communicate with the bot and maximize its capabilities.
```