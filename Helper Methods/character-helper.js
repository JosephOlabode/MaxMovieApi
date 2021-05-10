import lodash from "lodash";
import axios from "axios";

async function sortMovieCharactersByName(filter) {
    const movieCharacters = await axios.get('https://swapi.dev/api/people/');
    const sortedCharacters =  lodash.sortBy(movieCharacters.data.results, (character) => {
        return character.name
    });

    return filterCharacterByGender(filter, sortedCharacters);
}

async function sortCharactersByHeight(filter) {
    const movieCharacters = await  axios.get('https://swapi.dev/api/people/');
    const sortedCharacters =  lodash.sortBy(movieCharacters.data.results, (character) => {
        return character.height
    });

    return filterCharacterByGender(filter, sortedCharacters);
}

function filterCharacterByGender(filter, data) {
    return lodash.filter(data, (character) => {
        return character.gender === filter;
    });
}

function generateCharacterMetaData(sortedCharacter) {
    let characterSum = 0;
    sortedCharacter.forEach((character) => {
        characterSum += parseInt(character.height);
    })

    return  {
        totalNumberOfCharacters: sortedCharacter.length.toString() ,
        heightOfCharactersInCM: characterSum.toString() + ".00 cm",
        heightOfCharactersInFeet: (characterSum/30.48).toFixed(2) + " ft"
    }
}

export default {
    generateCharacterMetaData,
    sortCharactersByHeight,
    sortMovieCharactersByName
}