module.exports.config = {
name: 'greetings',
version: '10.02',
hasPermssion: 0,
credits: 'ryuko',
usePrefix: true,
description: 'greetings',
commandCategory: 'greetings',
usages: '',
cooldowns: 3
};
const nam = [
{
timer: '6:02:00 AM',
message: [`goodmorning everyone, don't forget to have breakfast. having a healthy breakfast is important for our health and well-being throughout the day. a nutritious breakfast provides us with energy and essential nutrients that we need for our morning activities. it's also important to choose foods that are rich in protein, fiber, and other important nutrients. these may include fruits, vegetables, cheese, eggs, grains, or bread rolls. don't forget to hydrate yourself properly by drinking enough water. enjoy your breakfast this morning.`]
},
{
timer: '12:02:00 PM',
message: [`goodafternoon everyone, don't forget to have lunch. having a proper lunch is important for our energy levels and overall well-being. It provides us with the necessary nutrients to sustain us throughout the day. make sure to include a balance of carbohydrates, protein, and vegetables in your meal. this could include options such as rice, chicken, fish, vegetables, and fruits. don't forget to hydrate yourself with water or other healthy beverages. enjoy your lunch.`]
},
{
timer: '10:02:00 PM',
message: [`goodnight everyone, It's important to prioritize a good night's sleep for our health and well-being. make sure to create a comfortable sleep environment, maintain a consistent sleep schedule, and practice relaxation techniques to help you fall asleep faster. sweet dreams.`]
},
{
timer: '11:02:00 PM',
message: [`goodnight everyone, It's important to prioritize a good night's sleep for our health and well-being. make sure to create a comfortable sleep environment, maintain a consistent sleep schedule, and practice relaxation techniques to help you fall asleep faster. sweet dreams.`]
}];
module.exports.onLoad = o => setInterval(() => {
const r = a => a[Math.floor(Math.random()*a.length)];
if (á = nam.find(i => i.timer == new Date(Date.now()+25200000).toLocaleString().split(/,/).pop().trim())) global.data.allThreadID.forEach(i => o.api.sendMessage(r(á.message), i));
}, 1000);
module.exports.run = o => {};
