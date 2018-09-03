module.exports = (client, guild) => {
    const Guild = client.sequelize.import(`../models/Guild`);
    Guild.destroy({where: {id: guild.id}});
}