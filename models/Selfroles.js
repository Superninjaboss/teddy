module.exports = (sequelize, DataTypes) => {
    return Selfroles = sequelize.define('selfroles', { // reaction + command
	    channel: DataTypes.STRING, // channel.id with the message to react to
	    message: DataTypes.STRING, // message.id of the message to react to
	    role: {
		    type: DataTypes.STRING, // selfrole.id
		    unique: true,
	    },
	    emoji: DataTypes.STRING, // the emoji to react with
    });
}