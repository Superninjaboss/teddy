exports.run = async (client, message, args) => {
    if (message.author.id !== '193870645174468609') return;
    try {
        let evaled = await eval(args.join(' '));
        if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
            message.channel.send(evaled, {code:"xl"});
        }
    catch(err) {
          message.channel.send(`\`\`\`xl\n${err}\n\`\`\``);      
    } 
}

exports.config = {
    permission: 'BotOwner'
}