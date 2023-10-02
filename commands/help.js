const{ SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('node:path');
const commandsPath = __dirname;
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const locales = {
    pl: {
        commandNotFound: 'Nie znaleziono polecenia o nazwie **',
    },
};
function getCommands(){
    const commands = []
    for(const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if('data' in command && 'execute' in command){
            commands.push({
                name: command.data.name,
                nameLocales: command.data.name_localizations ?? {},
                description: command.data.description,
                descriptionLocales: command.data.description_localizations,
            });
        }
    }
    return commands;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setNameLocalizations({
            pl: 'pomoc',
        })
        .setDescription('Show all available commands or show command info')
        .setDescriptionLocalizations({
            pl: 'Wyświetla listę poleceń lub wyświetla opis polecenia',
        })
        .addStringOption(option =>
            option
                .setName('command')
                .setNameLocalizations({
                    pl: 'polecenie',
                })
                .setDescription('The command you want to show info about')
                .setDescriptionLocalizations({
                    pl: 'Polecenie, które chcesz poznać',
                })),
    async execute(interaction) {
        let message = '';
        let embedColor = 0x76675b;
        
        try{
            const inputCommand = interaction.options._hoistedOptions[0].value;
            const commands = getCommands();
            commands.forEach(command => {
                if(inputCommand === command.name && command.nameLocales[interaction.locale])
                    message = '**' + command.name + '** - ' + command.description;
                else if(inputCommand === command.nameLocales[interaction.locale])
                    message = '**' + command.nameLocales[interaction.locale] + '** - ' + command.descriptionLocales[interaction.locale];
                else if(inputCommand === command.name && !command.nameLocales[interaction.locale])
                    message = '**' + command.name + '** - ' + command.descriptionLocales[interaction.locale];
            });
            if(message === ''){
                embedColor = 0xff0000;
                message = locales[interaction.locale] ?? {commandNotFound: 'Cannot find any information about **'};
                message = message.commandNotFound + inputCommand + '**';
            }
        }
        catch(err) {
            if(err.name !== 'TypeError') throw "An unknown error has occurred";
            const commands = getCommands();
            commands.forEach(command => {
                message += '\n**' + `${command.nameLocales[interaction.locale] ?? command.name}` + '** - ' + (command.descriptionLocales[interaction.locale] ?? command.description);
            });
        }
        await interaction.reply({ embeds: [{
            color: embedColor,
            author: {
                name: 'Customs discord bot',
                icon_url: 'https://i.imgur.com/PSqNTSc.png',
                url: 'https://discord.com/api/oauth2/authorize?client_id=768137231344468012&permissions=1497332444241&scope=bot',
            },
            description: message,
        }] });
    },
};
