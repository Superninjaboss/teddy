exports.run = async (client, message, args) => {
    const role = message.guild.roles.find("name", args.join(' '));
    if (!role) return message.reply("role not found.");
    const Selfroles = client.sequelize.import(`../models/Selfroles`);
    try {
        await Selfroles.create({
            channel: undefined,
            message: undefined,
            role: role.id,
            emoji: undefined,
        });
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
    description: 'Makes a role a selfrole or not.',
    usage: prefix => prefix + "toggleselfrole <role>"
}
    