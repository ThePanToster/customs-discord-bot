function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const{ SlashCommandBuilder } = require('discord.js');
const los = getRndInteger(0, 4);
const skins = ['High Noon', 'Blood Moon', 'SKT T1', 'Project', 'Dark Cosmic'];
const locales = {
    pl: {
        warning: 'Nie jesteś prawdziwym mainem Jhina',
        choosing: 'Picknij ',
    },
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('jhin')
        .setDescription('Choosing a random jhin skin for Błażej')
        .setDescriptionLocalizations({
            pl: 'Losowanie jakiego skinka ma Błażej wybrać na Jhinie',
        }),
    async execute(interaction) {
        let message = '';
        let embedColor = 0x76675b;

        if(interaction.user.id !== '229219961296519169') {
            embedColor = 0xff0000;
            message = locales[interaction.locale] ?? { warning: 'You\'re not worthy' };
            message = message.warning;
        }
        else{
            message = (locales[interaction.locale] ?? { choosing: 'Pick ' });
            message = message.choosing + skins[los];
        }

        await interaction.reply({ embeds: [{
            color: embedColor,
            author: {
                name: 'Customs discord bot',
                icon_url: 'https://i.imgur.com/PSqNTSc.png',
                url: 'https://discord.com/api/oauth2/authorize?client_id=768137231344468012&permissions=1497332444241&scope=bot',
            },
            description: message,
        }] });
    },
};
