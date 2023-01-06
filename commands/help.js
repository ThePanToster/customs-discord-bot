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
        const embedColor = 0x76675b;
        try{
            const inputCommand = interaction.options._hoistedOptions[0].value;
            for(const file of commandFiles) {
                const filePath = path.join(commandsPath, file);
                const command = require(filePath);
                if('data' in command && 'execute' in command) {
                    try{
                        if(inputCommand === command.data.name_localizations[interaction.locale])
                            message = '**' + `${command.data.name_localizations[interaction.locale]}` + '** - ' + (command.data.description_localizations[interaction.locale] ?? command.data.description);
                    }
                    catch{ 1; }
                    if(inputCommand === command.data.name)
                        message = '**' + `${command.data.name}` + '** - ' + (command.data.description_localizations[interaction.locale] ?? command.data.description);
                }
            }
            if(message === '')
                message = (locales[interaction.locale].commandNotFound ?? 'Cannot find any information about **') + inputCommand + '**';
        }
        catch(err) {
            for(const file of commandFiles) {
                const filePath = path.join(commandsPath, file);
                const command = require(filePath);
                if('data' in command && 'execute' in command)
                    message += '\n**' + `${command.data.name}` + '** - ' + (command.data.description_localizations[interaction.locale] ?? command.data.description);
            }
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
