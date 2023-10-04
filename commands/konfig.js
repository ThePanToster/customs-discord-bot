const {
  ActionRowBuilder,
  ChannelSelectMenuBuilder,
  SlashCommandBuilder,
  ChannelType,
} = require('discord.js');
const locales = {
  pl: [
    'Wybierz kanał drużyny pierwszej',
    'A teraz wybierz kanał drużyny drugiej',
    'Wybierz poczekalnie dla graczy obu drużyn',
    'Nie wybrano żadnej opcji, anulowano konfigurację',
    'Konfiguracja zakończona pomyślnie',
  ],
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('config')
    .setNameLocalizations({
      pl: 'konfig',
    })
    .setDescription("Configure the bot's behaviour")
    .setDescriptionLocalizations({
      pl: 'Skonfiguruj działanie bota',
    }),
  async execute(interaction) {
    const select = new ChannelSelectMenuBuilder({
      custom_id: 'teamselect',
      placeholder: 'Select a channel',
      max_values: 1,
      min_values: 1,
      channel_types: [ChannelType.GuildVoice],
    });

    const row = new ActionRowBuilder().addComponents(select);

    const firstResponse = await interaction.reply({
      content:
        locales[interaction.locale][0] ?? 'Select a channel for the first team',
      components: [row],
    });
    const collectorFilter = (i) => i.user.id === interaction.user.id;

    try {
      let confirmation = await firstResponse.awaitMessageComponent({
        filter: collectorFilter,
        time: 60000,
      });

      const conf = require('../configs/config');
      var config = conf.getConfig(interaction.guild.id);

      config.channels.team1 = confirmation.values[0];

      const secondResponse = await confirmation.update({
        content:
          locales[interaction.locale][1] ??
          'Select a channel for the second team',
        components: [row],
      });
      confirmation = await secondResponse.awaitMessageComponent({
        filter: collectorFilter,
        time: 60000,
      });

      config.channels.team2 = confirmation.values[0];

      const thirdResponse = await confirmation.update({
        content:
          locales[interaction.locale][2] ?? 'Select a channel for all teams',
        components: [row],
      });
      confirmation = await thirdResponse.awaitMessageComponent({
        filter: collectorFilter,
        time: 60000,
      });

      config.channels.waitRoom = confirmation.values[0];
      conf.setConfig(interaction.guild.id, config);

      await confirmation.update({
        content:
          locales[interaction.locale][4] ??
          'Configuration finished succesfully',
        components: [],
      });
    } catch (e) {
      await interaction.editReply({
        content:
          locales[interaction.locale][3] ??
          'Response not received within 1 minute, cancelling',
        components: [],
      });
    }
  },
};
