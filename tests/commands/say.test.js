const say = require('../../commands/say');
const mockInteraction = {
    returnValue: '',
    locale: 'en',
    user: {
        username: 'Subaru Natsuki',
    },
    options: {
        _hoistedOptions: []
    },
    reply(message){this.returnValue = message},
};

describe('Say command', () => {
    it('returns a message when no parameter is provided', () => {
        say.execute(mockInteraction);
        expect(mockInteraction.returnValue.embeds[0].description).toEqual('Hello Subaru Natsuki');
    });

    it('returns a localized message when no parameter and locale == "pl"', () => {
        mockInteraction.locale = 'pl';
        say.execute(mockInteraction);
        expect(mockInteraction.returnValue.embeds[0].description).toEqual('Witaj Subaru Natsuki');
    });

    it('returns a message when provided', () => {
        mockInteraction.options._hoistedOptions = [{value: 'Example message'}];
        say.execute(mockInteraction);
        expect(mockInteraction.returnValue.embeds[0].description).toEqual('Example message');
    });
});