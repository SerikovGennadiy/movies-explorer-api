const router = require('express').Router();

const { getMovies, saveMovie, deleteMovie } = require('../controllers/movies');
const { saveMoviePostedDataCheck, deleteMovieParamDataCheck } = require('../middlewares/request-data-checking/movie');

router.get('/', getMovies);
router.post('/', saveMoviePostedDataCheck, saveMovie);
router.delete('/:movieId', deleteMovieParamDataCheck, deleteMovie);

module.exports = router;
