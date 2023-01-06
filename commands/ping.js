const{ SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Test the bot to see if it replies')
        .setDescriptionLocalizations({
            pl: 'Testowanie czy bot odpowiada',
        }),
    async execute(interaction) {
        const message = 'pong!';
        const embedColor = 0x76675b;
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