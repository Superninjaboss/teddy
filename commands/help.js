exports.run = (client, message, args) => {
    const detail = args[0];
    if (detail){
        const command = client.commands.get(detail);
        if (command) {
            const output = ["= " + detail + " ="];
            if (command.help) {
                output.push(command.help.description);
                output.push("Usage: " + command.help.usage(message.guild.config.prefix));
            }
            message.channel.send(output, {code: 'asciidoc'});
        }
        else message.reply(`"${detail}" isn't a valid command!`);
    }
    else {
        const helplist = ["= Command List =", "", "[Use " + message.guild.config.prefix + "help <commandname> for details]",""]
        const commandNames = [...client.commands.keys()].sort();
        const longest = Math.max(...commandNames.map(name => name.length));
        commandNames.forEach(commandName => {
            const command = client.commands.get(commandName);
            if (command.help) helplist.push(message.guild.config.prefix + commandName + " ".repeat(longest - commandName.length) + " :: " + command.help.description);
        })
        message.channel.send(helplist, {code: 'asciidoc'});
    }
}

exports.help = {
    name: 'help',
    description: 'help',
    usage: prefix => prefix + 'help'
}

exports.config = {
    permission: 'User'
}