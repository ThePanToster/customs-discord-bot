const ping = require("../../commands/ping");
const mockInteraction = {
  returnValue: "",
  client: { ws: { ping: 100 } },
  createdTimestamp: 1723802300257,
  reply(message) {
    this.returnValue = message;
  },
};

describe("Ping command", () => {
  it('returns "pong!"', () => {
    ping.execute(mockInteraction);
    expect(mockInteraction.returnValue.embeds[0].description).toEqual(
      `🏓 Pong!\n> Latency: **${
        Date.now() - 1723802300257
      }**ms\n> API Latency: **100**ms`
    );
  });
});
