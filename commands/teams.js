const { SlashCommandBuilder } = require('discord.js');

const locales = {
  pl: [
    'Musisz znajdować się na kanale aby wylosować drużyny',
    'Wymagane minimum 4 graczy na kanale aby rozpocząć losowanie',
    'Liczba graczy musi być parzysta, aby było sprawiedliwie',
  ],
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('teams')
    .setNameLocalizations({
      pl: 'teamy',
    })
    .setDescription('Create randomized teams')
    .setDescriptionLocalizations({
      pl: 'Losowanie drużyn',
    }),
  async execute(interaction) {
    const conf = require('../configs/config');
    const voiceChannel = interaction.member.voice.channel;
    let message = '';
    let embedColor = 0xff0000;

    if (!voiceChannel)
      message =
        locales[interaction.locale][0] ??
        'You need to be present on a voice channel to randomize teams';
    else {
      let config = conf.getConfig(interaction.guild.id);
      let members = voiceChannel.members;
      let membersCount = members.size;

      if (membersCount < 4)
        message =
          locales[interaction.locale][1] ??
          'Minimum 4 players required on a voice channel to begin';
      else {
        // Rozdziela ludzi na kanale na dwa teamy i spisuje do zmiennej configs
        config.users.team1 = members.randomKey(Math.ceil(membersCount / 2));
        config.users.team2 = Array.from(
          members
            .filter((member) => !config.users.team1.includes(member.user.id))
            .keys()
        );

        conf.setConfig(interaction.guild.id, config);

        // Wyświetlenie utworzonych teamów

        embedColor = 0x76675b;
        message = '> Team 1:\n';

        config.users.team1.forEach((e) => {
          message += `> - <@${e}> \n`;
        });

        message += '\n> Team 2:\n';

        config.users.team2.forEach((e) => {
          message += `> - <@${e}> \n`;
        });
      }
    }
    await interaction.reply(conf.embedMessage(message, embedColor));
  },
};
