module.exports = (client, message) => {
    if (message.author.bot || message.channel.type !== 'text') return;
    const prefix = message.guild.config.prefix;
    const mention = new RegExp('^\<\@!?' + client.user.id + '>');
    if (message.content.startsWith(prefix) || mention.test(message.content)){
        const args = message.content.startsWith(prefix) ? message.content.slice(prefix.length).split(/ +/) : message.content.split(/ +/).slice(1);
        const commandName = args.shift();
        const command = client.commands.get(commandName);
        const permission = require('../functions/permission.js');
        if (!command) return;
        if (command.config) {
            if (!permission(message.member, command.config.permission)) return message.reply(`\`\`${command.config.permission}\`\` required to use \`\`${commandName}\`\``);
        }
        command.run(client, message, args);
    }
}