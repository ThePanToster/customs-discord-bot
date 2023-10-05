const { SlashCommandBuilder } = require('discord.js');
const { getRandomInt } = require('../utils/random');

const locales = {
  pl: [
    'Przed użyciem tego polecenia wylosuj drużyny poleceniem /teamy',
    'W drużynie nie może być więcej niż 5 graczy',
  ],
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('role')
    .setDescription('Chooses random roles for the players in 5 vs 5 teams')
    .setDescriptionLocalizations({
      pl: 'Losuje role dla graczy w drużynach max. 5 vs 5',
    }),
  async execute(interaction) {
    const conf = require('../configs/config');
    const config = conf.getConfig(interaction.guild.id);
    let message = '';
    let embedColor = 0xff0000;

    if (!config.users.team1.length || !config.users.team2.length)
      message =
        locales[interaction.locale][0] ??
        'Create teams with /teams first before using this command';
    else if (config.users.team1.length > 5 || config.users.team2.length > 5)
      message =
        locales[interaction.locale][1] ??
        'You cannot have more than 5 players in one team';
    else {
      const rolesTeam1 = new Set(['TOP', 'JNG', 'MID', 'ADC', 'SUP']);
      const rolesTeam2 = new Set([...rolesTeam1]);

      embedColor = 0x76675b;
      message = '> Team 1:\n';

      config.users.team1.forEach((e) => {
        let role = Array.from(rolesTeam1)[getRandomInt(0, rolesTeam1.size - 1)];
        rolesTeam1.delete(role);
        message += `> - [${role}] - <@${e}> \n`;
      });

      message += '\n> Team 2:\n';

      config.users.team2.forEach((e) => {
        let role = Array.from(rolesTeam2)[getRandomInt(0, rolesTeam2.size - 1)];
        rolesTeam2.delete(role);
        message += `> - [${role}] - <@${e}> \n`;
      });
    }
    await interaction.reply(conf.embedMessage(message, embedColor));
  },
};
