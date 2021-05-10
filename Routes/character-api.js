import express from "express";
import characterHelperMethods from '../Helper Methods/character-helper.js'

const router = express.Router();

router.get('/allCharacters', async (req, res, next) => {
    const sortParameter = req.query.sort;
    const gender = req.query.gender;

    try {
        if(sortParameter.toString() === 'name') {

            const sortedCharacterList = await characterHelperMethods.sortMovieCharactersByName(gender);
            res.status(200).send({
                metadata: characterHelperMethods.generateCharacterMetaData(sortedCharacterList),
                data: sortedCharacterList
            });

        } else if(sortParameter.toString() === 'height') {

            const sortedCharacterList = await characterHelperMethods.sortMovieCharactersByHeight(gender);

            res.status(200).send({
                metadata: characterHelperMethods.generateCharacterMetaData(sortedCharacterList),
                data: sortedCharacterList
            });

        }
    } catch(err) {
        res.status(404).send({error: err});
    }
});

export {router as characterRouter};


