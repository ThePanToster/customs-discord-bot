// Importing classes and declaring variables
require('dotenv').config();
const{ Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('node:path');
const token = process.env.TOKEN;
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
    ],
});


// Loading all commands
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if('data' in command && 'execute' in command)
        client.commands.set(command.data.name, command);
    else
        console.log(`[UWAGA] Polecenie ${filePath} nie posiada własności "data" lub "execute".`);
}


// When ready
client.once(Events.ClientReady, c => {
    console.log(`Bot pomyslnie zalogowany jako ${c.user.tag}`);
});


// Command handler
client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if(!command) {
        console.error(`Nie znaleziono polecenia ${interaction.commandName}.`);
        return;
    }

    try{
        await command.execute(interaction);
    }
    catch(error) {
        console.error(error);
        await interaction.reply({ content: 'Wystąpił problem w uruchomieniu tego polecenia!', ephemeral: true });
    }
});


// Log in via token
client.login(token);
