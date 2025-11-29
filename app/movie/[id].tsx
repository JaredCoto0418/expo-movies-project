import { getMovieTrailer, movieDetailsAction } from "@/core/actions/movies";
import * as Linking from 'expo-linking';
import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MovieDetailsContent = () => {
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

  useEffect(() => {
    if (movieQuery.isError) {
      console.error('movieQuery error:', movieQuery.error);
    }
  }, [movieQuery.isError, movieQuery.error]);

  useEffect(() => {
    if (trailerQuery.isError) {
      console.error('trailerQuery error:', trailerQuery.error);
    }
  }, [trailerQuery.isError, trailerQuery.error]);

  if (movieQuery.isLoading || trailerQuery.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color="purple" size="large" />
      </View>
    );
  }

  if (movieQuery.isError || !movieQuery.data) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error loading movie details.</Text>
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
      <View className="flex-row items-center justify-between px-4 py-4">
        <Pressable onPress={() => router.back()}>
          <Text className="text-2xl font-bold text-purple-600">← Back</Text>
        </Pressable>
      </View>

      <View className="h-64 w-full overflow-hidden">
        <Image
          source={{ uri: movie.backdrop }}
          className="h-full w-full"
          resizeMode="cover"
        />
      </View>

      <View className="px-4 py-6">
        <Text className="mb-2 text-3xl font-bold text-gray-900">
          {movie.title}
        </Text>

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

        <View className="mb-4 h-px bg-gray-200" />

        <Text className="mb-2 text-lg font-semibold text-gray-900">
          Synopsis
        </Text>
        <Text className="text-base leading-6 text-gray-700">
          {movie.description}
        </Text>

        <View className="mt-8 items-center">
          <Image
            source={{ uri: movie.poster }}
            className="rounded-lg shadow-lg"
            style={{ width: 150, height: 225 }}
            resizeMode="cover"
          />
        </View>

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

const MovieDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  // This component now only exists to provide the ID to the content component,
  // ensuring hooks are not called conditionally.
  return <MovieDetailsContent />;
};

export default MovieDetailsScreen;
