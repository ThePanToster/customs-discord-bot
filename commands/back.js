const { SlashCommandBuilder } = require('discord.js');
const locales = {
  pl: [
    'Przed użyciem tego polecenia skonfiguruj kanały poleceniem /konfig',
    'Przeniesiono ',
    ' graczy na <#',
  ],
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('back')
    .setNameLocalizations({
      pl: 'wróć',
    })
    .setDescription('Moves players from both teams to a wait room')
    .setDescriptionLocalizations({
      pl: 'Przenosi graczy z obu drużyn do poczekalni',
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
      channel1.members.forEach((member) => {
        member.voice.setChannel(waitRoom);
        moveCount++;
      });
      channel2.members.forEach((member) => {
        member.voice.setChannel(waitRoom);
        moveCount++;
      });
      moveCount && (embedColor = 0x00ff00);
      message =
        (locales[interaction.locale][1] ?? 'Moved ') +
        moveCount +
        (locales[interaction.locale][2] ?? ' players to <#') +
        waitRoom +
        '>';
    }
    await interaction.reply(conf.embedMessage(message, embedColor));
  },
};
