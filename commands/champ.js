const { SlashCommandBuilder } = require('discord.js');
const { getRandomInt } = require('../utils/random');

const locales = {
  pl: ['Zagraj **', ' pod **full ', ' z **'],
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('champ')
    .setNameLocalizations({
      pl: 'postać',
    })
    .setDescription('Chooses a random champion / build / summoner spells')
    .setDescriptionLocalizations({
      pl: 'Losowanie postaci / buildu / summonerów',
    })
    .addStringOption((option) =>
      option
        .setName('role')
        .setNameLocalizations({
          pl: 'rola',
        })
        .setDescription('Champion role')
        .setDescriptionLocalizations({
          pl: 'Rola postaci',
        })
        .addChoices(
          { name: 'Top', value: 'top' },
          { name: 'Jungle', value: 'jungle' },
          { name: 'Mid', value: 'mid' },
          { name: 'ADC', value: 'adc' },
          { name: 'Support', value: 'support' }
        )
    )
    .addBooleanOption((option) =>
      option
        .setName('build')
        .setDescription('Whether or not to choose a build')
        .setDescriptionLocalizations({
          pl: 'Czy losować build',
        })
    )
    .addBooleanOption((option) =>
      option
        .setName('summoners')
        .setDescription('Whether or not to choose summoner spells')
        .setDescriptionLocalizations({
          pl: 'Czy losować summonery',
        })
    ),
  async execute(interaction) {
    const conf = require('../configs/config');
    let message = '';
    const embedColor = 0x76675b;

    const role = interaction.options.getString('role');
    let champions;

    if (role) {
      champions = require(`../champions/${role}.json`);
    } else {
      const roles = ['top', 'jungle', 'mid', 'adc', 'support'];
      champions = require(`../champions/${roles[getRandomInt(0, 4)]}.json`);
    }

    message +=
      (locales[interaction.locale][0] ?? 'Play **') +
      champions.champ[getRandomInt(0, champions.champ.length - 1)] +
      '**';

    if (interaction.options.getBoolean('build')) {
      const builds = [
        'AD',
        'AP',
        'armor',
        'attack speed',
        'magic resist',
        'movement speed',
        'life steal',
        'lethality',
      ];
      message +=
        (locales[interaction.locale][1] ?? ' building **full ') +
        builds[getRandomInt(0, builds.length - 1)] +
        '**';
    }

    if (interaction.options.getBoolean('summoners')) {
      //     0 - ghost'em
      //     1 - heal'em
      //     2 - barrier'ą
      //     3 - exhaust'em
      //     4 - flash'em
      //     5 - teleport'em
      //     6 - cleanse'm
      //     7 - ignite'm
      //     8 - smite'm
      const summoners = new Set([
        'ghost',
        'heal',
        'barrier',
        'exhaust',
        'flash',
        'teleport',
        'cleanse',
        'ignite',
        'smite',
      ]);
      let summoner = Array.from(summoners)[getRandomInt(0, summoners.size - 1)];
      summoners.delete(summoner);
      message +=
        (locales[interaction.locale][2] ?? ' with **') +
        summoner +
        ', ' +
        Array.from(summoners)[getRandomInt(0, summoners.size - 1)] +
        '**';
    }

    await interaction.reply(conf.embedMessage(message, embedColor));
  },
};
