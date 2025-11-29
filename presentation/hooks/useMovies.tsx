import { useEffect } from 'react';
import {
  nowPlayingAction,
  popularMoviesPaginated,
  topRatedMoviesPaginated,
  upcomingMoviesPaginated,
} from "@/core/actions/movies";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const useMovies = () => {
  const nowPlatingQuery = useQuery({
    queryKey: ["movies", "now-playing"],
    queryFn: nowPlayingAction,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  const popularQuery = useInfiniteQuery({
    queryKey: ["movies", "popular-infinite"],
    queryFn: ({ pageParam = 1 }) => popularMoviesPaginated(pageParam),
    getNextPageParam: (lastPage) => (lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined),
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  const topRatedQuery = useInfiniteQuery({
    queryKey: ["movies", "top-rated-infinite"],
    queryFn: ({ pageParam = 1 }) => topRatedMoviesPaginated(pageParam),
    getNextPageParam: (lastPage) => (lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined),
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  const upcomingQuery = useInfiniteQuery({
    queryKey: ["movies", "upcoming-infinite"],
    queryFn: ({ pageParam = 1 }) => upcomingMoviesPaginated(pageParam),
    getNextPageParam: (lastPage) => (lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined),
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  useEffect(() => {
    if (nowPlatingQuery.isError) {
      console.error('nowPlatingQuery error:', nowPlatingQuery.error);
    }
  }, [nowPlatingQuery.isError, nowPlatingQuery.error]);

  useEffect(() => {
    if (popularQuery.isError) {
      console.error('popularQuery error:', popularQuery.error);
    }
  }, [popularQuery.isError, popularQuery.error]);

  useEffect(() => {
    if (topRatedQuery.isError) {
      console.error('topRatedQuery error:', topRatedQuery.error);
    }
  }, [topRatedQuery.isError, topRatedQuery.error]);

  useEffect(() => {
    if (upcomingQuery.isError) {
      console.error('upcomingQuery error:', upcomingQuery.error);
    }
  }, [upcomingQuery.isError, upcomingQuery.error]);

  return {
    nowPlatingQuery,
    popularQuery,
    topRatedQuery,
    upcomingQuery,
  };
};
