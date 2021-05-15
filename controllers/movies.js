const BadRequestError = require('../errors/bad-request');
const InternalServerError = require('../errors/internal-serer-error');
const MethodNotAllowError = require('../errors/method-not-allow-error');
const NotFoundError = require('../errors/not-found-error');

const Movie = require('../model/movie');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ data: movies }))
    .catch(() => { throw new InternalServerError('Ошибка загрузки сохраненных фильмов'); })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const owner = req.currentUser.id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    owner,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные при сохранении фильмы');
      } else {
        throw new InternalServerError('Ошибка при сохранении фильма в коллекцию');
      }
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { id } = req.currentUser;
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail()
    .then((movie) => {
      if (String(movie.owner) !== String(id)) {
        const err = new MethodNotAllowError('Вам нельзя удалить этот фильм');
        next(err);
      }
      return movie;
    })
    .then((movie) => Movie.findByIdAndRemove(movie._id))
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        throw new NotFoundError('Фильм с указанным _id не найдена');
      } else if (err.name === 'CastError') {
        throw new BadRequestError('Невалидный id');
      } else {
        throw new InternalServerError('Ошибка по умолчанию.');
      }
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
