const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Test the bot to see if it replies')
    .setDescriptionLocalizations({
      pl: 'Testowanie czy bot odpowiada',
    }),
  async execute(interaction) {
    const message = 'Pong!';
    const embedColor = 0x76675b;
    const conf = require('../configs/config');

    await interaction.reply(conf.embedMessage(message, embedColor));
  },
};
