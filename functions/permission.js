module.exports = (member, permission) => {
    switch (permission) {
        case 'BotOwner':
            return member.id === '193870645174468609'
        case 'BotAdmin':
            return ['193870645174468609'].includes(member.id);
        case 'Admin':
            return member.permissions.has('ADMINISTRATOR');
        case 'Manager':
            return member.permissions.has('MANAGE_GUILD');
        case 'Moderator':
            return member.roles.has(member.guild.config.modRole) || member.permissions.has('ADMINISTRATOR');
        case 'DJ':
            return member.guild.queueUser ? member.roles.has(member.guild.config.modRole) || member.permissions.has('ADMINISTRATOR') || member.guild.queueUser[0] === member.id : true;
        case 'User':
            return true;
    }
}