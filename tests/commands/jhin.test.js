const jhin = require('../../commands/jhin');
const mockInteraction = {
    returnValue: '',
    locale: 'en',
    user: {
        username: 'Subaru Natsuki',
        id: '111111212121121211',
    },
    options: {
        _hoistedOptions: []
    },
    reply(message){this.returnValue = message},
};

beforeEach(() => {
    mockInteraction.user.id = '111111212121121211';
    mockInteraction.locale = 'en';
})

describe('Jhin command', () => {
    it('returns an error message when userid is wrong', () => {
        jhin.execute(mockInteraction);
        expect(mockInteraction.returnValue.embeds[0].description).toEqual('You\'re not worthy');
        expect(mockInteraction.returnValue.embeds[0].color).toEqual(0xff0000);
    });

    it('returns a message when userid is correct', () => {
        mockInteraction.user.id = '229219961296519169';
        jhin.execute(mockInteraction);
        expect(mockInteraction.returnValue.embeds[0].description).toMatch(/^Pick .+/);
    });

    it('returns a localized error message when userid is wrong', () => {
        mockInteraction.locale = 'pl';
        jhin.execute(mockInteraction);
        expect(mockInteraction.returnValue.embeds[0].description).toEqual('Nie jesteś prawdziwym mainem Jhina');
        expect(mockInteraction.returnValue.embeds[0].color).toEqual(0xff0000);
    });

    it('returns a localized message when userid is correct', () => {
        mockInteraction.locale = 'pl';
        mockInteraction.user.id = '229219961296519169';
        jhin.execute(mockInteraction);
        expect(mockInteraction.returnValue.embeds[0].description).toMatch(/^Picknij .+/);
    });
});