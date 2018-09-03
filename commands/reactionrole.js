exports.run = async (client, message, args) => {
    const msg = await message.channel.fetchMessage(args.shift());
    if (!msg) return message.reply("message not found.");
    const emoji = args.shift();
    const role = message.guild.roles.find("name", args.join(' '));
    if (!role) return message.reply("role not found.");
    await msg.react(emoji);
    const Selfroles = client.sequelize.import(`../models/Selfroles`);
    try {
        await Selfroles.create({
            channel: message.channel.id,
            message: msg.id,
            role: role.id,
            emoji: emoji
        })
        message.reply(`${role.name} added to selfroles.`)
    }
    catch (e) {
        if (e.name === 'SequelizeUniqueConstraintError') {
            await Selfroles.destroy({ where: {role: role.id}});
            message.reply(`${role.name} removed from selfroles.`)
        }
    }
}

exports.config = {
    permission: 'Manager'
}

exports.help = {
    description: "Like toggleselfroles with the possibility to self assign it by reacting.",
    usage: prefix => prefix + "reactionrole <messageID> <unicode emoji> <role>" 
}