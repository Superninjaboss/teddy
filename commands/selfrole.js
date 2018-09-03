exports.run = async (client, message, args) => {
    const role = message.guild.roles.find("name", args);
    const Selfroles = client.sequelize.import(`../models/Selfroles`);
    const selfrole = await Selfroles.findOne({ where:{ role: role.id}})
    if (selfrole){
        if (message.member.roles.has(role.id)){
            message.member.removeRole(role)
                .then(r => message.reply(`${args} removed from yourself successfully.`))
                .catch(err => message.reply("missing permissions."));
        }
        else {
            message.member.addRole(role)
                .then(r => message.reply(`${args} added to yourself successfully.`))
                .catch(err => message.reply("missing permissions."));
        }
    }
    else return message.reply(`${args} isn't a selfrole in this server.`);
}

exports.config = {
    permission: 'User'
}

exports.help = {
    description: "Adds or removes a selfrole to or from yourself.",
    usage: prefix => prefix + "selfrole <role>"
}