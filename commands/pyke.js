function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const { SlashCommandBuilder } = require('discord.js');
const skins = [
  'Sand Wraith',
  'Blood Moon',
  'PsyOps',
  'Project',
  'Sentinel',
  'Soul Fighter',
  'Empyrean',
];
const locales = {
  pl: {
    warning: "Nie jesteś prawdziwym mainem Pyke'a",
    choosing: 'Picknij ',
  },
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pyke')
    .setDescription('Choosing a random pyke skin for Rafał')
    .setDescriptionLocalizations({
      pl: "Losowanie jakiego skinka ma Rafał wybrać na Pyke'u",
    }),
  async execute(interaction) {
    let message = '';
    let embedColor = 0x76675b;
    const conf = require('../configs/config');
    const los = getRndInteger(0, skins.length - 1);

    if (interaction.user.id !== '440584458454958091') {
      embedColor = 0xff0000;
      message = locales[interaction.locale] ?? { warning: "You're not worthy" };
      message = message.warning;
    } else {
      message = locales[interaction.locale] ?? { choosing: 'Pick ' };
      message = message.choosing + skins[los];
    }

    await interaction.reply(conf.embedMessage(message, embedColor));
  },
};
