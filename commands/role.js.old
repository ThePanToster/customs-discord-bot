module.exports = {
    name: 'role',
    description: "Losuje role dla teamów (ma sens tylko przy teamach 5vs5)",
    alias: ["role", "r", "roles"],
    syntax: "role",
    execute(message, args){

        function getRndInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1) ) + min;
        }

        var configs = require(`../configs/${message.guild.id}.json`);

        if(!configs[3]){
            message.channel.send("Nie wylosowano teamów");
            return;
        }

        if(configs[3].gracze > 10){
            message.channel.send("Za dużo osób żeby przydzielić 5 roli");
            return;
        }

        var membersCount = configs[3].gracze;
        var roles = ["Top", "Jungle", "Mid", "Adc", "Support"];
        var wiadomosc=">>> Team 1:\n";
        var i;
        var rolaLosowa;

        for(i = 0; i<membersCount/2; i++){
            wiadomosc += "<@" + `${configs[i+4].graczTeamu1}` + "> - ";
            do {
                rolaLosowa = getRndInteger(0, 4);
            }
            while (roles[rolaLosowa] == "0");

            wiadomosc += roles[rolaLosowa] + "\n";
            roles[rolaLosowa] = "0";
        }
        message.channel.send(`${wiadomosc}`);


        var roles = ["Top", "Jungle", "Mid", "Adc", "Support"];
        wiadomosc=">>> Team 2:";
        for(i = 0; i<membersCount/2; i++){
            wiadomosc += "\n<@" + `${configs[i+24].graczTeamu2}` + "> - ";
            do {
                rolaLosowa = getRndInteger(0, 4);
            }
            while (roles[rolaLosowa] == "0");

            wiadomosc += roles[rolaLosowa];
            roles[rolaLosowa] = "0";
        }
        message.channel.send(`${wiadomosc}`);
    }
}