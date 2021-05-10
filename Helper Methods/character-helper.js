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
    let sum = 0;
    sortedCharacter.forEach((n) => {
        sum += parseInt(n.height);
    })

    return  {
        totalNumberOfCharacters: sortedCharacter.length.toString() ,
        heightOfCharactersInCM: sum.toString() + ".00 cm",
        heightOfCharactersInFeet: (sum/30.48).toFixed(2) + " ft"
    }
}

export default {
    generateCharacterMetaData,
    sortCharactersByHeight,
    sortMovieCharactersByName
}