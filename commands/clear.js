exports.run = async (client, message, args) => {
    await message.delete();
    const user = message.mentions.members.first();
    let amount = parseInt(args[0]) ? parseInt(args[0]) : parseInt(args[1]);
    if (!user) {
        if (!amount) return message.reply("mention a user or specify an amount.").then(m => m.delete(3000));
        message.channel.fetchMessages({ limit: amount }).then(msgs => {
            const trash = msgs.filter(m => m.createdTimestamp >= (Math.floor(Date.now()) - 1209600000));
            message.channel.bulkDelete(trash);
            message.reply(`I have deleted ${trash.size} message(s) for you.`).then(m => m.delete(3000));
        });
    }
    else {
        if (!amount) amount = 100;
        message.channel.fetchMessages({ limit: 100 }).then(msgs => { // fetch the maximum amount of messages possible to filter out the trash
            const messages = msgs.filter(m => m.author.id === user.id).map(m => m.createdTimestamp);
            const trash = msgs.filter(m => m.author.id === user.id && m.createdTimestamp >= messages[Math.min(amount - 1, messages.length - 1)] && m.createdTimestamp >= (Math.floor(Date.now()) - 1209600000));
            message.channel.bulkDelete(trash);
            message.reply(`I have deleted ${trash.size} message(s) for you.`).then(m => m.delete(3000));
        });
    }
}

exports.config = {
    permission: 'Moderator'
}

exports.help = {
    description: 'Bulk deletes messages.',
    usage: prefix => prefix + 'clear <amount|@user>'
}