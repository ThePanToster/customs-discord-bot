module.exports = {
    name: 'wroc',
    description: "Przenosi graczy z obu drużyn do poczekalni",
    alias: ["wroc", "wróć", "w", "b", "back"],
    syntax: "wroc",
    execute(message, args){
        var configs = require(`../configs/${message.guild.id}.json`);

        if(!configs[1] || !configs[2] || !configs[0]){
            message.channel.send("Nie skonfigurowano kanałów");
            return;
        }

        const teamOneChannel = `${configs[1].team1}`;
        const teamTwoChannel = `${configs[2].team2}`;
        const poczekalniaChannel = `${configs[0].poczekalnia}`;
        var t1channel = message.guild.channels.cache.find(channel => channel.id === teamOneChannel);
        var t2channel = message.guild.channels.cache.find(channel => channel.id === teamTwoChannel);
        var pchannel = message.guild.channels.cache.find(channel => channel.id === poczekalniaChannel);
        var przeniesienia = 0;

        for (const [memberID, member] of t1channel.members) {
            member.voice.setChannel(`${poczekalniaChannel}`).then(() => console.log(`Przeniesiono ${member.user.tag} do poczekalni.`)).catch(console.error);
            przeniesienia++;
        }
        for (const [memberID, member] of t2channel.members) {
            member.voice.setChannel(`${poczekalniaChannel}`).then(() => console.log(`Przeniesiono ${member.user.tag} do poczekalni.`)).catch(console.error);
            przeniesienia++;
        }
        if (przeniesienia)
            message.channel.send("Przeniesiono "+`${przeniesienia}`+" graczy na kanał "+`${pchannel}`);
        else
            message.channel.send("Nie przeniesiono nikogo lol");
    }
}