const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '?';
const fs = require('fs');
client.commands = new Discord.Collection();

// Wczytywanie skryptów z komendami
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);


    client.commands.set(command.name, command);
}

// Gdy bot będzie gotowy
client.once('ready', () => {
    console.log('Bocik jest online');
});

// Niestandardowy status
client.on("ready", () => {
    client.user.setActivity("?help", { type: "LISTENING"})
    // client.channels.fetch('768146932706574337')
    // .then(channel => console.log(channel.name));
})

client.on('message', message =>{
// Sprawdzanie czy to komenda a nie zwykła wiadomość i rozdzielanie argumentów
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

// Sprawdzanie czy istnieje plik config dla tego serwera, jak nie to tworzy pusty
    if(!fs.existsSync(`./configs/${message.guild.id}.json`)) fs.writeFileSync(`./configs/${message.guild.id}.json`, JSON.stringify({}), err => {
        if (err) {
            console.log(err);
            message.channel.send(err);
        }
    })

// Sprawdzanie komend
    if(command === 'ping'){
        client.commands.get('ping').execute(message, args);
    }
    else if (command == 'teamy' || command == 't' || command == 'teams'){
        client.commands.get('teamy').execute(message, args);
    }
    else if (command == 'konfig' || command == 'config' || command == 'konfiguracja'){
        client.commands.get('konfig').execute(message, args, client);
    }
    else if (command == 'powiedz' || command == 'say'){
        client.commands.get('powiedz').execute(message, args);
    }
    else if (command == 'przenies' || command == 'p' || command == 'move' || command == 'przenieś'){
        client.commands.get('przenies').execute(message, args);
    }
    else if (command == 'role' || command == 'r' || command == 'roles'){
        client.commands.get('role').execute(message, args);
    }
    else if (command == 'help' || command == 'pomoc'){
        client.commands.get('help').execute(message, args);
    }
    else if (command == 'wroc' || command == 'wróć' || command == 'back' || command == 'b' || command == 'w'){
        client.commands.get('wroc').execute(message, args);
    }
    else if (command == 'jhin'){
        client.commands.get('jhin').execute(message, args);
    }
    else if (command == 'champ' || command == 'champion' || command == 'c' || command == 'postac' || command == 'postać'){
        client.commands.get('champ').execute(message, args);
    }
    else if (command == 'pyke'){
        client.commands.get('pyke').execute(message, args);
    }
})

client.login(process.env.TOKEN);
