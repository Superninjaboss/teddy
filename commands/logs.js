exports.run = async (client, message, args) => {
    const Guild = client.sequelize.import(`../models/Guild`);
    if (message.guild.config.logs === message.channel.id) {
        await Guild.update({ logs: null }, { where: { id: message.guild.id } });
        message.guild.config.logs = null;
        return message.reply("this is no longer a logging channel.");
    }
    const affectedRows = await Guild.update({ logs: message.channel.id }, { where: { id: message.guild.id } });
    if (affectedRows > 0) {
        message.guild.config.logs = message.channel.id;
        return message.reply(`this is now a logging channel.`);
    }
    await Guild.create({
        id: message.guild.id,
        prefix: null,
        modRole: null,
        logs: message.channel.id,
    });
    message.guild.config.logs = message.channel.id;
    return message.reply(`this is now a logging channel.`);
}

exports.config = {
    permission: 'Manager'
}

exports.help = {
    description: "Turns the current channel into a logging channel.",
    usage: prefix => prefix + "logs"
}