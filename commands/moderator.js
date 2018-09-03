exports.run = (client, message, args) => {
    const Guild = client.sequelize.import(`../models/Guild`);
    const role = message.guild.roles.find(r => r.name === args.join(' '));
    if (role) {
        message.guild.config.modRole = role.id;
        Guild.update({modRole: role.id}, {where: {id: message.guild.id}}).then(message.reply(role.name + " is now the Moderator role."));
    }
    else {
        message.guild.config.modRole = null;
        Guild.update({modRole: null}, {where: {id: message.guild.id}}).then(message.reply("The Moderator role has been set to null."));
    }
}