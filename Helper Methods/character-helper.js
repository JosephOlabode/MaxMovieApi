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
    const character = await  axios.get('https://swapi.dev/api/people/');
    const sortedData =  lodash.sortBy(character.data.results, (obj) => {
        return obj.height
    });

    return filterCharacterByGender(filter, sortedData);
}

function filterCharacterByGender(filter, data) {
    return lodash.filter(data, (character) => {
        return character.gender === filter;
    });
}

function generateMetaData(sortedData) {
    let sum = 0;
    sortedData.forEach((n) => {
        sum += parseInt(n.height);
    })

    return  {
        numberOfCharacters: sortedData.length.toString() ,
        totalHeightOfCharactersInCM: sum.toString() + ".00 cm",
        totalHeightOfCharactersInFeet: centimeterToFeet(sum)
    }
}

function centimeterToFeet(height) {
    return (height/30.48).toFixed(2) + " ft";
}

export default {
    generateMetaData,
    sortCharactersByHeight,
    sortMovieCharactersByName
}