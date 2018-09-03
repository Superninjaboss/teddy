module.exports = async (client, message) => {	
    if (!message.guild.config.logs) return;
    const channel = message.guild.channels.get(message.guild.config.logs);
    channel.send({embed: {
    color: 0xff0000,
    author: {
        name: message.author.username + "#" + message.author.discriminator,
            icon_url: message.author.avatarURL
        },
        description: "**Message deleted in <#" + message.channel.id + ">**\n" + message.content,
        footer: {
            text:  "ID:" + message.id
        },
        timestamp: new Date(),
    }});
}