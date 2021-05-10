import express from "express";
const router = express.Router();
import characterHelperMethods from '../Helper Methods/character-helper.js'


router.get('/allCharacters', async (req, res, next) => {
    const sortParameter = req.query.sort;
    const gender = req.query.gender;

    try {
        if(sortParameter.toString() === 'name') {

            const sortedData = await characterHelperMethods.sortMovieCharactersByName(gender);
            res.status(200).send({metadata: characterHelperMethods.generateMetaData(sortedData), data: sortedData});

        } else if(sortParameter.toString() === 'height') {

            const sortedData = await characterHelperMethods.sortCharactersByHeight(gender);

            res.status(200).send({metadata: characterHelperMethods.generateCharacterMetaData(sortedData), data: sortedData});

        }
    } catch(e) {
        res.status(404).send({err: e});
    }
});

export {router as characterRouter};


