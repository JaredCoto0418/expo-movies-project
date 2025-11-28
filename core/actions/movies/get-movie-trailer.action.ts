import { moviesApi } from "@/core/api/movie-api";
import { MovieDBVideosResponse, Video } from "@/infraestructure/interfaces/movie-videos.response";

export const getMovieTrailer = async (movieId: number): Promise<Video | null> => {
  try {
    const { data } = await moviesApi.get<MovieDBVideosResponse>(
      `/movie/${movieId}/videos`
    );

    const trailer = data.results.find(
      (video: Video) => video.site === "YouTube" && video.type === "Trailer"
    );

    return trailer || (data.results.length > 0 ? data.results[0] : null);
  } catch (error) {
    console.error(`Error fetching trailer for movie ${movieId}:`, error);
    return null;
  }
};
