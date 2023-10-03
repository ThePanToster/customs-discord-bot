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
    setConfig(guildId, {
      channels: { team1: '', team2: '', waitRoom: '' },
      users: { team1: [], team2: [] },
    });
    config = getConfig(guildId);
  }
  return config;
};

module.exports = { getConfig: getConfig, setConfig: setConfig };
