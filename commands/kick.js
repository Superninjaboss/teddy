exports.run = (client, message, args) => {
    const member = message.guild.getMember(args.shift());
    const reason = args.join(' ');
    try {
        if (!member) throw "member not found.";
        if (member.id === message.guild.owner.id) throw "this is the owner."
        if (member.highestRole.position >= message.member.highestRole.position) throw "the mentioned member has a higher or equal role than you.";
        member.kick(reason)
            .then(message.reply(`${member.user.tag} has been kicked for the following reason: ${reason || "None"}`))
            .catch(err => message.reply("missing permissions."));
    }
    catch (err) {
        message.reply(err)
    }
}

exports.config = {
    permission: 'Moderator'
}

exports.help = {
    description: "Kicks the mentioned member.",
    usage: prefix => prefix + "kick <@member> <optional: reason>"
}