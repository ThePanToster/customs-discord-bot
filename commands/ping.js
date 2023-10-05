const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Test the bot to see if it replies')
    .setDescriptionLocalizations({
      pl: 'Testowanie czy bot odpowiada',
    }),
  async execute(interaction) {
    const embedColor = 0x76675b;
    const conf = require('../configs/config');
    const message =
      '🏓 Pong!\n> Latency: **' +
      (Date.now() - interaction.createdTimestamp) +
      '**ms\n> API Latency: **' +
      Math.round(interaction.client.ws.ping) +
      '**ms';

    await interaction.reply(conf.embedMessage(message, embedColor));
  },
};
