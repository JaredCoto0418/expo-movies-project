import { getMovieTrailer, movieDetailsAction } from "@/core/actions/movies";
import * as Linking from 'expo-linking';
import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MovieDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const safeArea = useSafeAreaInsets();

  const trailerQuery = useQuery({
    queryKey: ["trailer", id],
    queryFn: () => getMovieTrailer(Number(id)),
    enabled: !!id,
  });

  const movieQuery = useQuery({
    queryKey: ["movie", id],
    queryFn: () => movieDetailsAction(Number(id)),
    enabled: !!id,
  });

    if (movieQuery.isLoading || trailerQuery.isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator color={"purple"} size="large" />
      </View>
    );
  }

  if (movieQuery.isError || !movieQuery.data) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg text-red-500">Error loading movie details</Text>
        <Pressable
          onPress={() => router.back()}
          className="mt-4 rounded-lg bg-purple-600 px-6 py-3"
        >
          <Text className="text-white">Go Back</Text>
        </Pressable>
      </View>
    );
  }

    const movie = movieQuery.data;
  const trailer = trailerQuery.data;

  return (
    <ScrollView
      className="flex-1 bg-white"
      style={{ paddingTop: safeArea.top }}
    >
      {/* Header with back button */}
      <View className="flex-row items-center justify-between px-4 py-4">
        <Pressable onPress={() => router.back()}>
          <Text className="text-2xl font-bold text-purple-600">← Back</Text>
        </Pressable>
      </View>

      {/* Movie Backdrop */}
      <View className="h-64 w-full overflow-hidden">
        <Image
          source={{ uri: movie.backdrop }}
          className="h-full w-full"
          resizeMode="cover"
        />
      </View>

      {/* Movie Info */}
      <View className="px-4 py-6">
        {/* Title */}
        <Text className="mb-2 text-3xl font-bold text-gray-900">
          {movie.title}
        </Text>

        {/* Release Date and Rating */}
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="text-base text-gray-600">
            {new Date(movie.release).getFullYear()}
          </Text>
          <View className="flex-row items-center rounded-full bg-yellow-100 px-3 py-1">
            <Text className="text-lg font-bold text-yellow-600">★</Text>
            <Text className="ml-1 text-base font-semibold text-yellow-600">
              {movie.rating.toFixed(1)}
            </Text>
          </View>
        </View>

        {trailer && (
          <Pressable
            onPress={() => Linking.openURL(`https://www.youtube.com/watch?v=${trailer.key}`)}
            className="mt-4 mb-4 rounded-lg bg-red-600 py-3 px-6 self-center"
          >
            <Text className="text-white font-bold text-lg">Watch Trailer</Text>
          </Pressable>
        )}

        {/* Divider */}
        <View className="mb-4 h-px bg-gray-200" />

        {/* Description */}
        <Text className="mb-2 text-lg font-semibold text-gray-900">
          Synopsis
        </Text>
        <Text className="text-base leading-6 text-gray-700">
          {movie.description}
        </Text>

        {/* Poster */}
        <View className="mt-8 items-center">
          <Image
            source={{ uri: movie.poster }}
            className="rounded-lg shadow-lg"
            style={{ width: 150, height: 225 }}
            resizeMode="cover"
          />
        </View>

        {/* Additional Info */}
        <View className="mt-8 rounded-lg bg-gray-100 p-4">
          <Text className="mb-2 text-base font-semibold text-gray-900">
            Release Date
          </Text>
          <Text className="text-base text-gray-700">
            {new Date(movie.release).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default MovieDetailsScreen;
