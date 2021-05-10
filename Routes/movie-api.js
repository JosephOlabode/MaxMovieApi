import express from 'express';
import axios from "axios";
import lodash from 'lodash';

const router = express.Router();

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