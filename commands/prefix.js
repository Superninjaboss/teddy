exports.run = (client, message, args) => {
    if (args.length < 1) return message.reply("prefix can't be changed to undefined.")
    const Guild = client.sequelize.import(`../models/Guild`);
    const prefix = args.join(' ');
    message.guild.config.prefix = prefix;
    Guild.update({prefix: prefix}, {where: {id: message.guild.id}})
        .then(message.reply("prefix has been changed to " + prefix));
}

exports.config = {
    permission: 'Manager'
}