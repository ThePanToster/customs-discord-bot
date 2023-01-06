const{ SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Test the bot to see if it replies')
        .setDescriptionLocalizations({
            pl: 'Testowanie czy bot odpowiada',
        }),
    async execute(interaction) {
        await interaction.reply('pong!');
    },
};