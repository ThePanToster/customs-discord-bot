module.exports = {
    name: 'przenies',
    description: "Przenosi graczy na odpowiednie kanały drużyn",
    alias: ["przenies", "przenieś", "p", "move"],
    syntax: "przenies",
    execute(message, args){

        const voiceChannel = message.member.voice.channel;
        var configs = require(`../configs/${message.guild.id}.json`);

        if(!configs[1] || !configs[2]){
            message.channel.send("Nie skonfigurowano kanałów");
            return;
        }

        if(!configs[3]){
            message.channel.send("Nie wylosowano teamów");
            return;
        }

        const teamOneChannel = configs[1].team1;
        const teamTwoChannel = configs[2].team2;
        var membersCount = configs[3].gracze;
        // const poczekalniaChannel = configs[0].poczekalnia;

        if (!voiceChannel)
            message.channel.send("Nie ma Ciebie na kanale, więc nie wiem z którego kanału mam przenosić osoby");
        else{
            for (const [memberID, member] of voiceChannel.members) {
                var i;
                for(i = 0; i<membersCount/2; i++){
                    if(memberID == configs[i+4].graczTeamu1)
                        member.voice.setChannel(teamOneChannel).then(() => console.log(`Przeniesiono ${member.user.tag} do drużyny pierwszej.`)).catch(console.error);
                }
                for(i = 0; i<membersCount/2; i++){
                    if(memberID == configs[i+24].graczTeamu2)
                        member.voice.setChannel(teamTwoChannel).then(() => console.log(`Przeniesiono ${member.user.tag} do drużyny drugiej.`)).catch(console.error);
                }
            }
            message.channel.send("Przeniesiono graczy");
        }
    }
}