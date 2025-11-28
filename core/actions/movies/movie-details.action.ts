import { moviesApi } from "@/core/api/movie-api";
import { Movie, TheMovieDbItem } from "@/infraestructure/interfaces";
import { MovieMapper } from "@/infraestructure/mappers/movie.mapper";

export const movieDetailsAction = async (movieId: number): Promise<Movie> => {
  try {
    const { data } = await moviesApi.get<TheMovieDbItem>(`/movie/${movieId}`);

    const movie = MovieMapper.fromtheMovieDbToMovie(data);

    return movie;
  } catch (error) {
    throw "No se pudo obtener los detalles de la película";
  }
};
