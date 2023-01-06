const{ SlashCommandBuilder } = require('discord.js');
const locales = {
    pl: 'Witaj ',
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setNameLocalizations({
            pl: 'powiedz',
        })
        .setDescription('The bot will repeat after you')
        .setDescriptionLocalizations({
            pl: 'Bot mówi co chcesz',
        })
        .addStringOption(option =>
            option
                .setName('input')
                .setNameLocalizations({
                    pl: 'tekst',
                })
                .setDescription('The input to echo back')
                .setDescriptionLocalizations({
                    pl: 'Wiadomość, którą ma przekazać bot',
                })),
    async execute(interaction) {
        let message = '';
        try{
            message = `${interaction.options._hoistedOptions[0].value}`;
        }
        catch{
            message = (locales[interaction.locale] ?? 'Hello ') + interaction.user.username;
        }
        await interaction.reply({ embeds: [{
            color: 0x76675b,
            author: {
                name: 'Customs discord bot',
                icon_url: 'https://i.imgur.com/PSqNTSc.png',
                url: 'https://discord.com/api/oauth2/authorize?client_id=768137231344468012&permissions=1497332444241&scope=bot',
            },
            description: message,
        }] });
    },
};