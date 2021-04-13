import {Movies} from '../database/movies.db-model';
import Movie from '../models/Movie';

export const createNewMovie = async (movie: Movie) => {
    let result;
    await Movies.create(movie).then(function(newMovie: any) {
        result = newMovie;

    });
    return result;
};

export const getMovieById = async (movieId: number) => {
    let result;
    await Movies.findByPk(movieId).then(function(movie) {
        result = movie;
    });
    return result;
};

export const updateMovie = async (movieId: number, movie: Movie) => {
    let result;
    await Movies.update(movie, {where: {id: movieId}, returning: true}).then(function(movie) {
        result = movie;
    });
    return result;
}

export const deleteMovie = async (movieId: number) => {
    let result;
    await Movies.destroy({where: {id: movieId}}).then(function(movie) {
        result = movie;
    });
    return result;
}