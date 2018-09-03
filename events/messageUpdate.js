module.exports = (client, messageOld, messageNew) => {	
	if (messageOld.content === messageNew.content || !messageOld.guild.config.logs) return;
	const channel = messageOld.guild.channels.get(messageOld.guild.config.logs);
	channel.send({embed: {
    color: 0xffff00,
    author: {
      name: messageOld.author.tag,
			icon_url: messageOld.author.avatarURL
		},
		description: "**Message sent by <@" + messageOld.author.id + "> edited in <#" + messageOld.channel.id + ">**",
		fields: [{
			name: "Old message:",
			value:  messageOld.content
		},
		{
			name: "New message:",
			value:  messageNew.content
		}],
		footer: {
			text:  "ID:" + messageOld.id
		},
		timestamp: new Date(),
  }});
};
