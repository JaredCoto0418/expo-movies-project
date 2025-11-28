import { useInfiniteMovies } from "@/presentation/hooks";
import { PaginatedMoviesResponse } from "@/core/actions/movies";
import React, { useMemo } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MoviesPoster from "@/presentation/components/movies/MoviesPoster";
import { Movie } from "@/infraestructure/interfaces";

const MoviesInfiniteScreen = () => {
  const safeArea = useSafeAreaInsets();
  const infiniteQuery = useInfiniteMovies();

  const allMovies = useMemo(() => {
    return infiniteQuery.data?.pages.flatMap((page: PaginatedMoviesResponse) => page.movies) ?? [];
  }, [infiniteQuery.data]);

  const handleLoadMore = () => {
    if (infiniteQuery.hasNextPage && !infiniteQuery.isFetchingNextPage) {
      infiniteQuery.fetchNextPage();
    }
  };

  const renderFooter = () => {
    if (!infiniteQuery.isFetchingNextPage) return null;
    return (
      <View className="py-4">
        <ActivityIndicator color="purple" size="large" />
      </View>
    );
  };

  if (infiniteQuery.isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator color={"purple"} size="large" />
      </View>
    );
  }

  if (infiniteQuery.isError) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg text-red-500">Error loading movies</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: safeArea.top }}>
      <Text className="text-3xl font-bold px-4 mb-4">Popular Movies</Text>
      <FlatList
        data={allMovies}
        keyExtractor={(item: Movie) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-around",
          paddingHorizontal: 8,
        }}
        renderItem={({ item }: { item: Movie }) => (
          <View className="mb-4 w-1/2">
            <MoviesPoster
              id={item.id}
              poster={item.poster}
              className="rounded-lg"
            />
          </View>
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default MoviesInfiniteScreen;
