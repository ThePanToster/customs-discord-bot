require('dotenv').config();
const{ REST, Routes } = require('discord.js');
const clientId = process.env.CLIENTID;
const token = process.env.TOKEN;
const fs = require('node:fs');

const commands = [];
// Grabbing all the command files from the commands directory
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Grabbing the SlashCommandBuilder#toJSON() output of each command's data for deployment
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

// Constructing and preparing an instance of the REST module
const rest = new REST({ version: '10' }).setToken(token);

// Deploying commands
(async () => {
    try{
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const data = await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    }
    catch(error) {
        console.error(error);
    }
})();