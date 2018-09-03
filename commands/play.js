const getYouTubeID = require("get-youtube-id");
const fetchVideoInfo = require("youtube-info");
const request = require("request");
const ytdl = require("ytdl-core");
var names = [];
var idlist = [];

function youtube(args) {
    if (args.toLowerCase().indexOf('://') > -1) return true;
    else return false;
}

function play(id, message) {
    message.guild.voiceChannel = message.member.voiceChannel;
    if (message.guild.dispatcher) message.guild.dispatcher.end();
    message.guild.voiceChannel.join()
        .then(connection => {
            const stream = ytdl("https://www.youtube.com/watch?v=" + id, {
                filter: 'audioonly'
            });
            message.guild.dispatcher = connection.playStream(stream);
            message.guild.dispatcher.on('end', () => {
                message.guild.queue.shift();
                message.guild.queueNames.shift();
                message.guild.queueUser.shift();
                if (message.guild.queue.length === 0) {
                      message.guild.playing = false;
                      message.guild.voiceChannel.leave();
                }
                else {
                    setTimeout(function() {
                        play(message.guild.queue[0], message);
                    }, 500);
                }
            });
        });
}

exports.run = (client, message, args) => {
    if (!message.guild.queue) {
        message.guild.queue = [];
        message.guild.queueNames = [],
        message.guild.queueUser = [],
        message.guild.isPlaying = false,
        message.guild.dispatcher = null,
        message.guild.voiceChannel = null,
        message.guild.skipReq = 0,
        message.guild.skippers =  []
    }
  
    if (message.member.voiceChannel || message.guild.voiceChannel ) {
        if (youtube(args[0])) {
            const id = getYouTubeID(args[0]);
            fetchVideoInfo(id, (err, videoInfo) => {
                    if (message.guild.isPlaying || message.guild.queue.length > 0) {
                        message.guild.queue.push(id);
                        message.guild.queueNames.push(id);
                        message.guild.queueUser.push(message.author.id);
                        message.reply(`added to queue: **${videoInfo.title}**`);
                    }
                    else {
                        message.guild.queue.push(id);
                        message.guild.queueNames.push(id);
                        message.guild.queueUser.push(message.author.id);
                        play(id, message);
                        message.reply(`now playing: **${videoInfo.title}**`);
                    }
            });
        }
        else {
                message.guild.voiceChannel = message.member.voiceChannel
                request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(args.join(' ')) + "&key=" + process.env.KEY, function(error, response, body) {
                    names = [];
                    idlist = [];
                    const json = JSON.parse(body);
                    const list = json.items.slice(0, 5);
                    list.forEach(item => {
                        fetchVideoInfo(item.id.videoId, (err, videoInfo) => {
                            if(videoInfo) {
                                idlist.push(item.id.videoId);
                                names.push(videoInfo.title);
                            }
                        });
                    });
                    setTimeout(async function () {
                        let reply = "No results!"
                        if (names.length > 0) reply = "1⃣" + names[0];
                        if (names.length > 1) reply = reply + "\n2⃣" + names[1]
                        if (names.length > 2) reply = reply + "\n3⃣" + names[2]
                        if (names.length > 3) reply = reply + "\n4⃣" + names[3]
                        if (names.length > 4) reply = reply + "\n5⃣" + names[4]
                        const msg = await message.channel.send(reply)
                        const filter = (reaction, user) => user === message.author && (0 < parseInt(reaction.emoji.name) && parseInt(reaction.emoji.name) < names.length + 1 || reaction.emoji.name === '❌')
                        const collector = msg.createReactionCollector(filter, { time: 60000, max: 1 });
                        collector.on('end', r =>  msg.delete())
                        collector.on('collect', r => {
                            if (r.emoji.name !== '❌') {
                                const number = parseInt(r.emoji.name);
                                if (message.guild.isPlaying || message.guild.queue.length > 0) {
                                    message.guild.queue.push(idlist[number - 1]);
                                    message.guild.queueNames.push(names[number - 1]);
                                    message.guild.queueUser.push(message.author.id);
                                    message.reply(`added to queue: **${names[number-1]}**`);
                                }
                                else if (message.member.voiceChannel) {
                                    message.guild.queue.push(idlist[number - 1]);
                                    message.guild.queueNames.push(names[number - 1]);
                                    message.guild.queueUser.push(message.author.id);
                                    play(idlist[number - 1], message);
                                    message.reply(`now playing: **${names[number-1]}**`);
                                }
                                else message.reply("join a voice channel first.");
                            }
                        });
                        if (names.length > 0 && !msg.deleted) await	msg.react('1⃣').catch(err => console.log(err));
                        if (names.length > 1 && !msg.deleted) await	msg.react('2⃣').catch(err => console.log(err));
                        if (names.length > 2 && !msg.deleted) await	msg.react('3⃣').catch(err => console.log(err));
                        if (names.length > 3 && !msg.deleted) await	msg.react('4⃣').catch(err => console.log(err));
                        if (names.length > 4 && !msg.deleted) await	msg.react('5⃣').catch(err => console.log(err));
                        if (!msg.deleted) msg.react('❌');
                    }, 2000);
                });
        }
    }
    else {
        message.reply("join a voice channel first.");
    }
}

exports.help = {
    description: "Plays audio from youtube.",
    usage: prefix => prefix + "play <link/query>"
}