import characterHelperMethods from '../../Helper Methods/character-helper.js'

describe('Character Sorting', () => {
    it('should return a character list that is sorted by name', async () => {
        const result = await characterHelperMethods.sortMovieCharactersByName('female');
        expect(result.some(character => character.name === 'Beru Whitesun lars')).toBeTruthy();
    });

    it('should return a list of characters that is sorted by height', async () => {
        const result = await characterHelperMethods.sortMovieCharactersByHeight('female');
        expect(result.some(character => character.height === '150')).toBeTruthy();
    })
});
describe('Filter data', () => {
    it('should return filtered data', async () => {
        const data = [
            {
                "name": "Joseph Olabode",
                "height": "190",
                "gender": "male",
            },
            {
                "name": "Tolu",
                "height": "157",
                "gender": "female"
            },
            {
                "name": "Olabode",
                "height": "168",
                "gender": "male",
            },
            {
                "name": "Bose",
                "height": "155",
                "gender": "female"
            },
            {
                "name": "Oluwaseun",
                "height": "175",
                "gender": "male",
            }

        ];

        const result  = characterHelperMethods.filterCharacterByGender('female', data);

        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    "name": "Tolu",
                    "height": "157",
                    "gender": "female"
                })
            ])
        )
    })
})

describe('Generate Metadata', () => {
    it('should generate metadata for the given data', () => {
        const data = [
            {
                "name": "Joseph Olabode",
                "height": "190",
                "gender": "male",
            },
            {
                "name": "Olabode",
                "height": "168",
                "gender": "male",
            },
            {
                "name": "Oluwaseun",
                "height": "175",
                "gender": "male",
            }

        ]
        const result  = characterHelperMethods.generateCharacterMetaData(data);
        expect(result).toMatchObject({
                totalNumberOfCharacters: '3',
                heightOfCharactersInCM: '533.00 cm',
                heightOfCharactersInFeet: '17.49 ft'
            }
        );
    });
})

