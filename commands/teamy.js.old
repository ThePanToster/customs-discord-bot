const { VoiceState, VoiceConnection } = require("discord.js")

module.exports = {
    name: 'teamy',
    description: "Losowanie teamkow",
    alias: ["teamy", "t", "teams"],
    syntax: "teamy",
    execute(message, args){
        const voiceChannel = message.member.voice.channel;
        const fs = require('fs');
        var configs = require(`../configs/${message.guild.id}.json`);
        var membersCount = 0;

// Deklaracja funkcji do losowania liczb z przedziału
        function getRndInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1) ) + min;
        }

        if (!voiceChannel)
            message.channel.send("Nie ma Ciebie na kanale, więc nie wiem gdzie teamki losować");
        else{
            //if (message.member.permissions.missing('ADMINISTRATOR')) return;
            
            for (const [memberID, member] of voiceChannel.members) {
                membersCount++;
            }
            if(membersCount < 4){
                message.channel.send("No jak będą conajmniej 4 osoby to mogę losować");
            }
            else if(membersCount % 2 == 1){
                message.channel.send("Nieparzysta liczba członków, troche niesprawiedliwe bedzie takie dzielenie :expressionless:");
            }
            else{
                configs[3] = { gracze: membersCount };
                var itaracje1 = 0;
                var itaracje2 = 0;

// Rozdziela ludzi na kanale na dwa teamy i spisuje do zmiennej configs
                for (const [memberID, member] of voiceChannel.members) {
                    var los = getRndInteger(1, 2);
                    if (los==1 && itaracje1 < membersCount / 2){
                        itaracje1++;
                        configs[itaracje1+3] = { "graczTeamu1": memberID }
                    }
                    else if (los==2 && itaracje2 < membersCount / 2) {
                        itaracje2++;
                        configs[itaracje2+23] = { "graczTeamu2": memberID }
                    }
                    else{
                        if(los==1){
                            itaracje2++;
                            configs[itaracje2+23] = { "graczTeamu2": memberID }
                        }
                        if(los==2){
                            itaracje1++;
                            configs[itaracje1+3] = { "graczTeamu1": memberID }
                        }
                    }
                }

// Wpis do JSON'a
                fs.writeFileSync(`./configs/${message.guild.id}.json`, JSON.stringify(configs), err => {
                    if (err){
                        console.log(err);
                        message.channel.send(err);
                    }
                });

// Wyświetlenie utworzonych teamów

                var wiadomosc="> Team 1:\n";
                //var wiadomosc="Team 1:\n";
                var i;
                for(i = 0; i<membersCount/2; i++){
                    wiadomosc += "> <@" + `${configs[i+4].graczTeamu1}` + ">\n";
                }
                message.channel.send(`${wiadomosc}`);

                wiadomosc="> Team 2:";
                for(i = 0; i<membersCount/2; i++){
                    wiadomosc += "\n> <@" + `${configs[i+24].graczTeamu2}` + ">";
                }
                message.channel.send(`${wiadomosc}`);
            }
        }
    }
}