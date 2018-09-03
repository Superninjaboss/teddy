module.exports = (guild, arg) => {
    const res = arg.match(/(?!^\<\@\!?)\d+(?=\>$)/);
    const id = res ? res[0] : null;
    return guild.members.get(id);
}