const { SlashCommandBuilder } = require('discord.js');
const locales = {
  pl: [
    'Przed użyciem tego polecenia skonfiguruj kanały poleceniem /konfig',
    'Przeniesiono ',
    ' graczy',
  ],
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('move')
    .setNameLocalizations({
      pl: 'przenieś',
    })
    .setDescription('Moves players to team channels')
    .setDescriptionLocalizations({
      pl: 'Przenosi graczy na kanały dwóch drużyn',
    }),
  async execute(interaction) {
    const conf = require('../configs/config');
    const config = conf.getConfig(interaction.guild.id);
    let message = '';
    let embedColor = 0xff0000;

    if (
      !config.channels.team1 ||
      !config.channels.team2 ||
      !config.channels.waitRoom
    )
      message =
        locales[interaction.locale][0] ??
        'Configure channels with /config first before using this command';
    else {
      const channel1 = await interaction.guild.channels.fetch(
        config.channels.team1
      );
      const channel2 = await interaction.guild.channels.fetch(
        config.channels.team2
      );
      const waitRoom = await interaction.guild.channels.fetch(
        config.channels.waitRoom
      );
      let moveCount = 0;
      waitRoom.members.forEach((member) => {
        if (config.users.team1.includes(member.id)) {
          member.voice.setChannel(channel1);
          moveCount++;
        } else if (config.users.team2.includes(member.id)) {
          member.voice.setChannel(channel2);
          moveCount++;
        }
      });

      moveCount && (embedColor = 0x00ff00);
      message =
        (locales[interaction.locale][1] ?? 'Moved ') +
        moveCount +
        (locales[interaction.locale][2] ?? ' players');
    }
    await interaction.reply(conf.embedMessage(message, embedColor));
  },
};
