const help = require('../../commands/help');
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
    mockInteraction.locale = 'en';
    mockInteraction.options = { _hoistedOptions: [] };
})

describe('Help command', () => {
    it('returns a list of commands when no parameter provided', () => {
        help.execute(mockInteraction);
        expect(mockInteraction.returnValue.embeds[0].description).toMatch(/\*\*help\*\* - Show all available commands or show command info/);
    });

    it('returns a localized list of commands when no parameter provided', () => {
        mockInteraction.locale = 'pl';
        help.execute(mockInteraction);
        expect(mockInteraction.returnValue.embeds[0].description).toMatch(/\*\*pomoc\*\* - Wyświetla listę poleceń lub wyświetla opis polecenia/);
    });

    it('returns an error message when invalid parameter provided', () => {
        mockInteraction.options._hoistedOptions = [{value: 'invalid'}];
        help.execute(mockInteraction);
        expect(mockInteraction.returnValue.embeds[0].description).toMatch('Cannot find any information about **invalid**');
        expect(mockInteraction.returnValue.embeds[0].color).toEqual(0xff0000);
    });

    it('returns an localized error message when invalid parameter provided', () => {
        mockInteraction.locale = 'pl';
        mockInteraction.options._hoistedOptions = [{value: 'invalid'}];
        help.execute(mockInteraction);
        expect(mockInteraction.returnValue.embeds[0].description).toMatch('Nie znaleziono polecenia o nazwie **invalid**');
        expect(mockInteraction.returnValue.embeds[0].color).toEqual(0xff0000);
    });
});