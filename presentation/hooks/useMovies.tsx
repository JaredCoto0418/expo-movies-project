import {
  nowPlayingAction,
  popularMoviesPaginated,
  topRatedMoviesPaginated,
  upcomingMoviesPaginated,
} from "@/core/actions/movies";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const useMovies = () => {
  const nowPlatingQuery = useQuery({
    queryKey: ["moving", "now-playing"],
    queryFn: nowPlayingAction,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const popularQuery = useInfiniteQuery({
    queryKey: ["movies", "popular-infinite"],
    queryFn: ({ pageParam = 1 }) => popularMoviesPaginated(pageParam),
    getNextPageParam: (lastPage) => lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const topRatedQuery = useInfiniteQuery({
    queryKey: ["movies", "top-rated-infinite"],
    queryFn: ({ pageParam = 1 }) => topRatedMoviesPaginated(pageParam),
    getNextPageParam: (lastPage) => lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const upcomingQuery = useInfiniteQuery({
    queryKey: ["movies", "upcoming-infinite"],
    queryFn: ({ pageParam = 1 }) => upcomingMoviesPaginated(pageParam),
    getNextPageParam: (lastPage) => lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60 * 24,
  });

  return {
    // methods
    nowPlatingQuery,
    popularQuery,
    topRatedQuery,
    upcomingQuery,

    //properties
  };
};
