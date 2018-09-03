module.exports = async (client) => {
    console.log(`Logged in as ${client.user.tag}`);
    require("youtube-info")('pe-GrRQz8pk', function(err, videoInfo) {});
    const Guild = client.sequelize.import(`../models/Guild`);
    client.guilds.forEach(async guild => {
        guild.config = await Guild.findById(guild.id);
        if (!guild.config) {
            Guild.create({
                id: guild.id,
                prefix: ",",
                modRole: null,
                logs: null
            })
            guild.config = {
                id: guild.id,
                prefix: ",",
                modRole: null,
                logs: null
            }
        }
        console.log(guild.config.id);
        guild.getMember = require('../functions/getMember.js').bind(null, guild);
    });
    const Selfroles = client.sequelize.import(`../models/Selfroles`);
    const selfroles = await Selfroles.all();
	selfroles.forEach(s => client.channels.get(s.channel).fetchMessage(s.message).catch(console.log(`Message ${s.message} in channel ${s.channel} not found.`)));
}