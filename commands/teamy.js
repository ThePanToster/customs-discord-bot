const { SlashCommandBuilder } = require('discord.js');

const locales = {
  pl: [
    'Musisz znajdować się na kanale aby wylosować drużyny',
    'Wymagane minimum 4 graczy na kanale aby rozpocząć losowanie',
    'Liczba graczy musi być parzysta, aby było sprawiedliwie',
  ],
};

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
    var membersCount = 0;
    let message = '';
    let embedColor = 0xff0000;

    if (!voiceChannel)
      message =
        locales[interaction.locale][0] ??
        'You need to be present on a voice channel to randomize teams';
    else {
      let config = conf.getConfig(interaction.guild.id);

      //if (message.member.permissions.missing('ADMINISTRATOR')) return;

      for (const [] of voiceChannel.members) {
        membersCount++;
      }
      if (membersCount < 4)
        message =
          locales[interaction.locale][1] ??
          'Minimum 4 players required on a voice channel to begin';
      else if (membersCount % 2 == 1)
        message =
          locales[interaction.locale][2] ??
          'Even number of players required on a voice channel';
      else {
        let itaracje1 = 0;
        let itaracje2 = 0;
        config.users.team1 = [];
        config.users.team2 = [];

        // Rozdziela ludzi na kanale na dwa teamy i spisuje do zmiennej configs
        for (const [memberID] of voiceChannel.members) {
          let los = getRndInteger(1, 2);
          if (los == 1 && itaracje1 < membersCount / 2) {
            itaracje1++;
            config.users.team1.push(memberID);
          } else if (los == 2 && itaracje2 < membersCount / 2) {
            itaracje2++;
            config.users.team2.push(memberID);
          } else {
            if (los == 1) {
              itaracje2++;
              config.users.team2.push(memberID);
            }
            if (los == 2) {
              itaracje1++;
              config.users.team1.push(memberID);
            }
          }
        }

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
