import express from 'express';
import axios from "axios";
import lodash from 'lodash';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The movie title.
 *           example: A New Hope
 *         episode_id:
 *           type: integer
 *           description: The episode number
 *           example: 4
 *         opening_crawl:
 *           type: string
 *           description: The opening message.
 *           example: It is a period of civil war.
 *         director:
 *           type: string
 *           description: The director.
 *           example: George Lucas
 *         producer:
 *           type: string
 *           description: The producer.
 *           example: Gary Kurtz, Rick McCallum
 *         release_date:
 *           type: date
 *           description: The date the movie was released.
 *           example: 1977-05-25
 *         characters:
 *           type: array
 *           items:
 *             type: string
 *             description: link to characters
 *             example: http://swapi.dev/api/people/1/
 *         planets:
 *           type: array
 *           items:
 *             type: string
 *             description: link to planets
 *             example: http://swapi.dev/api/planets/1/
 *         starship:
 *           type: array
 *           items:
 *             type: string
 *             description: link to starships
 *             example: http://swapi.dev/api/starships/1/
 *         vehicles:
 *           type: array
 *           items:
 *             type: string
 *             description: link to vehicles
 *             example: http://swapi.dev/api/vehicles/1/
 *         species:
 *           type: array
 *           items:
 *             type: string
 *             description: link to species
 *             example: http://swapi.dev/api/species/1/
 *         url:
 *           type: string
 *           description: link to movie.
 *           example: http://swapi.dev/api/films/1/
 *         created:
 *           type: date
 *           description: The date the movie was created.
 *           example: 2014-12-10T14:23:31.880000Z
 *         edited:
 *           type: date
 *           description: The last date the movie was edited.
 *           example: 2014-12-20T19:49:45.256000Z
 * /api/movies/allMovies:
 *   get:
 *     tags:
 *       - Movies
 *     summary: Movies are gotten from Max swapi api
 *     description: Returns all movies
 *     responses:
 *       200:
 *         description: Array of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 */

router.get('/allMovies', (req, res, next) => {
    axios.get('https://swapi.dev/api/films/')
        .then(function (response) {
            const sortedData = lodash.sortBy(response.data.results, (movie) => {
                return movie.release_date
            });

            res.status(200).send({
                'message': 'Sorted film data available',
                'response': sortedData
            });
        })
        .catch(function (caughtError) {
            res.send({err: caughtError});
        })
});

export { router as movieRouter };