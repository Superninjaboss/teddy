module.exports = async (client, messageReaction, user) => {
    const Selfroles = client.sequelize.import(`../models/Selfroles`);
	if (user.bot || !messageReaction.message.guild) return;
    const selfrole = await Selfroles.findOne({ where: { message: messageReaction.message.id, emoji: messageReaction.emoji.name}})
	if (!selfrole) return;
	const role = messageReaction.message.guild.roles.get(selfrole.role);
	if (!role) return;
	const member = messageReaction.message.guild.members.get(user.id);
	member.addRole(role);
};