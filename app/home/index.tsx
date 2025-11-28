import { MainSlideShow } from "@/presentation/components";
import MovieHorizontalList from "@/presentation/components/MovieHorizontalList";
import { useMovies } from "@/presentation/hooks";
import { router } from "expo-router";
import React from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HomeScreen = () => {
  const { nowPlatingQuery, popularQuery, topRatedQuery, upcomingQuery } =
    useMovies();

  const safeArea = useSafeAreaInsets();

  if (
    nowPlatingQuery.isLoading ||
    popularQuery.isLoading ||
    topRatedQuery.isLoading ||
    upcomingQuery.isLoading
  ) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator color={"purple"} size="large" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white" style={{ paddingTop: safeArea.top }}>
      <View className="px-4 py-4">
        <Text className="text-3xl font-bold mb-4">Movies APP</Text>
        <Pressable
          onPress={() => router.push("/home/movies")}
          className="rounded-lg bg-purple-600 py-3 px-4 mb-4"
        >
          <Text className="text-center text-white font-semibold text-lg">
            Explore All Popular Movies
          </Text>
        </Pressable>
      </View>

      <MainSlideShow movies={nowPlatingQuery.data ?? []} />

      {/* Peliculas Populares */}
      <MovieHorizontalList
        movies={popularQuery.data?.pages.flatMap(page => page.movies) ?? []}
        loadNextPage={() => popularQuery.fetchNextPage()}
        title="Peliculas Populares"
      />

      <MovieHorizontalList
        movies={topRatedQuery.data?.pages.flatMap(page => page.movies) ?? []}
        loadNextPage={() => topRatedQuery.fetchNextPage()}
        title="Mejor Calificadas"
      />

      <MovieHorizontalList
        movies={upcomingQuery.data?.pages.flatMap(page => page.movies) ?? []}
        loadNextPage={() => upcomingQuery.fetchNextPage()}
        title="Proximamente"
      />
    </ScrollView>
  );
};

export default HomeScreen;
