import { moviesApi } from "@/core/api/movie-api";
import { Movie, MovieDBMoviesResponse, TheMovieDbItem } from "@/infraestructure/interfaces";
import { MovieMapper } from "@/infraestructure/mappers/movie.mapper";

export interface PaginatedMoviesResponse {
  movies: Movie[];
  page: number;
  totalPages: number;
}

export const popularMoviesPaginated = async (
  page: number = 1
): Promise<PaginatedMoviesResponse> => {
  try {
    const { data } = await moviesApi.get<MovieDBMoviesResponse>("/popular", {
      params: {
        page,
      },
    });

    const movies = data.results.map((movieDbMovie: TheMovieDbItem) =>
      MovieMapper.fromtheMovieDbToMovie(movieDbMovie)
    );

    return {
      movies,
      page: data.page,
      totalPages: data.total_pages,
    };
  } catch (error) {
    throw "No se pudo obtener las películas";
  }
};
