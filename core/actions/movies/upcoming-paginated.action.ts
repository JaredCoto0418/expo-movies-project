import { moviesApi } from "@/core/api/movie-api";
import { Movie, MovieDBMoviesResponse, TheMovieDbItem } from "@/infraestructure/interfaces";
import { MovieMapper } from "@/infraestructure/mappers/movie.mapper";
import { PaginatedMoviesResponse } from "./popular-paginated.action";

export const upcomingMoviesPaginated = async (
  page: number = 1
): Promise<PaginatedMoviesResponse> => {
  try {
    const { data } = await moviesApi.get<MovieDBMoviesResponse>("/movie/upcoming", {
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
    throw new Error('No se pudo obtener las películas que vienen a futuro');
  }
};
