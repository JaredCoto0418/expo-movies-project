import { Movie, TheMovieDbItem } from "../interfaces";

export class MovieMapper
{
    static fromtheMovieDbToMovie(movie:TheMovieDbItem) : Movie{

        return {
            id: movie.id,
            title: movie.title,
            description: movie.overview,
            release: movie.release_date,
            rating: movie.vote_average,
            poster:`https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
            backdrop: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`,
        }
    }
}