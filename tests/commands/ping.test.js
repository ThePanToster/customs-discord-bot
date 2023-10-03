const ping = require('../../commands/ping');
const mockInteraction = {
    returnValue: "",
    reply(message){this.returnValue = message}
};

describe('Ping command', () => {
    it('returns "pong!"', () => {
        ping.execute(mockInteraction);
        expect(mockInteraction.returnValue.embeds[0].description).toEqual('pong!');
    });
});