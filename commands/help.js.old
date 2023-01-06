module.exports = {
    name: 'help',
    description: "Wyświetla listę poleceń lub wyświetla opis polecenia",
    alias: ["help", "pomoc"],
    syntax: "help [nazwa_polecenia]",
    execute(message, args){
        const fs = require('fs');
        const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
        if (args==""){
            var wiadomosc = ">>> Lista poleceń:";
            for(const file of commandFiles){
            const command = require(`./${file}`);
            wiadomosc += "\n**"+`${command.name}`+"** - "+`${command.description}`;
            }
            message.channel.send(`${wiadomosc}`);
        }
        else {
            for(const file of commandFiles){
                const command = require(`./${file}`);
                if (args == command.name){
                    var wiadomosc = ">>> Opis: "+`${command.description}`+"\nSyntax: "+`${command.syntax}`+"\nAliasy: ";
                    for (i = 0; i < command.alias.length; i++){
                        wiadomosc += command.alias[i];
                        if(i+1 < command.alias.length)
                            wiadomosc += ", ";
                    }
                    message.channel.send(`${wiadomosc}`);
                    return;
                }
            }
            message.channel.send("Nie znaleziono takiego polecenia, wpisz ?help, aby wyświetlić wszystkie dostępne polecenia");
        }
    }
}