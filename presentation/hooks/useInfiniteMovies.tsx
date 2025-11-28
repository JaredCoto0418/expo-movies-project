import { popularMoviesPaginated, PaginatedMoviesResponse } from "@/core/actions/movies";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteMovies = () => {
  const infiniteQuery = useInfiniteQuery({
    queryKey: ["movies", "popular-infinite"],
    queryFn: ({ pageParam = 1 }) => popularMoviesPaginated(pageParam),
    getNextPageParam: (lastPage: PaginatedMoviesResponse) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60 * 24,
  });

  return infiniteQuery;
};
