const fs = require('fs');

const setConfig = (guildId, config) => {
  fs.writeFileSync(
    `./configs/${guildId}.json`,
    JSON.stringify(config, null, 4),
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
};

const getConfig = (guildId) => {
  var config;

  try {
    config = require(`./${guildId}.json`);
  } catch (error) {
    if (guildId === undefined) throw 'guildId cannot be undefined';
    setConfig(guildId, {
      channels: { team1: '', team2: '', waitRoom: '' },
      users: { team1: [], team2: [] },
    });
    config = getConfig(guildId);
  }
  return config;
};

const embedMessage = (message, color) => {
  return {
    embeds: [
      {
        color: color,
        author: {
          name: 'Customs discord bot',
          icon_url: 'https://i.imgur.com/PSqNTSc.png',
          url: 'https://discord.com/api/oauth2/authorize?client_id=768137231344468012&permissions=1497332444241&scope=bot',
        },
        description: message,
      },
    ],
  };
};

module.exports = { setConfig, getConfig, embedMessage };
