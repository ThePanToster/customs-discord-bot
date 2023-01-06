module.exports = {
    name: 'konfig',
    description: "Konfiguracja bota",
    alias: ["konfig", "config", "konfiguracja"],
    syntax: "konfig [team1/team2/poczekalnia]",
    execute(message, args, client){
        var voiceChannel = message.member.voice.channel;
        const fs = require('fs');
        var configs = require(`../configs/${message.guild.id}.json`);

        if(args==''){
            fs.writeFileSync(`./configs/${message.guild.id}.json`, JSON.stringify({}), err => {
                if (err){
                    console.log(err);
                    message.channel.send(err);
                }
            });
            message.channel.send('Rozpoczęto konfigurację\nWejdź na kanał drużyny pierwszej i wpisz ?konfig team1');
        }
        else if(args == 'team1' && voiceChannel){
            configs[1] = {
                team1: voiceChannel.id
            }
            fs.writeFileSync(`./configs/${message.guild.id}.json`, JSON.stringify(configs), err => {
                if (err){
                    console.log(err);
                    message.channel.send(err);
                }
            });
            message.channel.send('A teraz wejdź na kanał drużyny drugiej i wpisz ?konfig team2');
        }
        else if(args == 'team2' && voiceChannel){
            configs[2] = {
                team2: voiceChannel.id
            }
            fs.writeFileSync(`./configs/${message.guild.id}.json`, JSON.stringify(configs), err => {
                if (err){
                    console.log(err);
                    message.channel.send(err);
                }
            });
            //if (configs[1] == voiceChannel) message.channel.send('Uwaga: ustawiono team 1 i 2 na tym samym kanale, to bez sensu!');
            message.channel.send('Teraz wejdź na poczekalnie i wpisz ?konfig poczekalnia');
        }
        else if(args == 'poczekalnia' && voiceChannel){
            configs[0] = {
                poczekalnia: voiceChannel.id
            }
            fs.writeFileSync(`./configs/${message.guild.id}.json`, JSON.stringify(configs), err => {
                if (err){
                    console.log(err);
                    message.channel.send(err);
                }
            });
            message.channel.send('No i powinno hulać');
        }
        else if(!voiceChannel)
            message.channel.send('Nie jesteś na kanale');
        else
            message.channel.send('Nie rozumiem, wpisz ?konfig');
    }
}