exports.run = async (client, message, args) => {
    try {
         const user = message.guild.getMember(args[0]).user || await client.fetchUser(args[0]);
          message.channel.send({embed: {
            author: {
              name: user.tag,
              icon_url: user.displayAvatarURL
            },
            thumbnail: {
              url: user.displayAvatarURL
            },
            fields: [{
              name: "ID:",
              value: user.id
            },
            {
              name: "Created On:",
              value: user.createdAt.toString().slice(0, user.createdAt.toString().indexOf('+'))
            },
            {
              name: "Status:",
              value: user.presence.status
            },
            {
              name: "Avatar URL:",
              value: user.displayAvatarURL
            }]
          }});
  }
  catch (err) {
          message.channel.send(`\`\`\`xl\n${err}\n\`\`\``);
  }
}
exports.config = {
    permission: 'User'
}
exports.help = {
    description: "Displays info about a user.",
    usage: prefix => prefix + "userinfo <@user/userID>"
}