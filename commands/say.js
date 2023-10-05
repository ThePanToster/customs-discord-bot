const { SlashCommandBuilder } = require('discord.js');
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
    .addStringOption((option) =>
      option
        .setName('input')
        .setNameLocalizations({
          pl: 'tekst',
        })
        .setDescription('The input to echo back')
        .setDescriptionLocalizations({
          pl: 'Wiadomość, którą ma przekazać bot',
        })
    ),
  async execute(interaction) {
    let message = '';
    const embedColor = 0x76675b;
    const conf = require('../configs/config');

    try {
      message = `${interaction.options._hoistedOptions[0].value}`;
    } catch {
      message =
        (locales[interaction.locale] ?? 'Hello ') + interaction.user.username;
    }
    await interaction.reply(conf.embedMessage(message, embedColor));
  },
};
