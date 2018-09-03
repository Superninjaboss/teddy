module.exports = (client, guild) => {
    const Guild = client.sequelize.import(`../models/Guild`);
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