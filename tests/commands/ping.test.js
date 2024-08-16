const ping = require("../../commands/ping");
const messagePattern =
  /^🏓 Pong!\n> Latency: \*\*[0-9]+\*\*ms\n> API Latency: \*\*100\*\*ms$/;
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
    expect(mockInteraction.returnValue.embeds[0].description).toMatch(
      messagePattern
    );
  });
});
