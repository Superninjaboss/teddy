exports.run = (client, message, args) => {
    if (message.guild.dispatcher){
        message.guild.dispatcher.end();
        message.reply("skipped.");
    }
}

exports.help = {
    description: "Skips the currently playing piece.",
    usage: prefix => prefix + "skip"
}

exports.config = {
    permission: 'DJ'
}