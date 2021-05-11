import express from "express";
import characterHelperMethods from '../Helper Methods/character-helper.js'

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     CharacterResponse:
 *       type: object
 *       properties:
 *         meta:
 *           type: object
 *           properties:
 *             totalNumberOfCharacters:
 *               type: integer
 *               description: The number of characters
 *               example: 0
 *             heightOfCharactersInCM:
 *               type: integer
 *               description: combined height of the characters in cm
 *             heightOfCharactersInFeet:
 *               type: integer
 *               description: combined height of characters in feet
 *
 * /api/character/allCharacters?sort=name&gender=male:
 *   get:
 *     tags:
 *       - Characters
 *     summary: Retrieves data sorted by name or filtered by gender
 *     description: This retrieves sort data base on name and gender
 *     parameters:
 *       - in: query
 *         name: sort
 *         required: true
 *         description: Data will be sorted by.
 *         example: name
 *         schema:
 *           type: string
 *       - in: query
 *         name: gender
 *         required: true
 *         description: Data will be filtered by.
 *         example: male
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sorted data
 */

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


