import { moviesApi } from "@/core/api/movie-api";
import { Movie, MovieDBMoviesResponse } from "@/infraestructure/interfaces";
import { MovieMapper } from "@/infraestructure/mappers/movie.mapper";

export const upcomingMoviesAction = async () : Promise<Movie[]> =>
{
    try{
        const { data } = await moviesApi.get<MovieDBMoviesResponse>('/movie/upcoming');
        
        const movies = data.results.map(movieDbMovie => MovieMapper.fromtheMovieDbToMovie(movieDbMovie))
        
        return movies;
    }catch(error)
    {
        
        throw new Error('No se pudo obtener las películas que vienen a futuro');
    }
};
