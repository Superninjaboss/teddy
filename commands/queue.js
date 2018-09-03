exports.run = (client, message, args) => {
    const list = [];
    if (message.guild.queueNames) {
        for (const name of message.guild.queueNames) {
            list.push(`**• ${name}**`);
        }
    }
    message.reply(`the queue contains following pieces:\n${list.join('\n')}`, {split: true});
}

exports.help = {
    description: "Lists the pieces in the queue.",
    usage: prefix => prefix + "queue"
}

exports.config = {
    permission: 'User'
}