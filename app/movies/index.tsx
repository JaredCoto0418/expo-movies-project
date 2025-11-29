import { popularMoviesPaginated } from '@/core/actions/movies';
import MoviesPoster from '@/presentation/components/movies/MoviesPoster';
import { useInfiniteQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import React from 'react';
import { ActivityIndicator, FlatList, Pressable, RefreshControl, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Movie {
  id: number;
  // Add other movie properties here
}

interface Page {
  page: number;
  totalPages: number;
  movies: Movie[];
}

const AllMoviesScreen = () => {
  const safeArea = useSafeAreaInsets();

  const { isLoading, data, fetchNextPage, refetch, isRefetching, isError, error } = useInfiniteQuery({
    queryKey: ['movies', 'popular', 'infinite'],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const result = await popularMoviesPaginated(pageParam);
      return result;
    },
    getNextPageParam: (lastPage: Page) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color="purple" size="large" />
      </View>
    );
  }

  if (isError) {
    console.error('Error fetching movies:', error);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error fetching movies. Please try again.</Text>
      </View>
    );
  }

  const movies = data?.pages.flatMap(page => page.movies) ?? [];

  return (
    <View style={{ flex: 1, paddingTop: safeArea.top, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 }}>
        <Pressable onPress={() => router.back()}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#8B5CF6' }}>← Back</Text>
        </Pressable>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Popular Movies</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Movie Grid */}
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor="purple"
          />
        }
        data={movies}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        numColumns={3}
        renderItem={({ item }) => (
          <View style={{ flex: 1, margin: 4 }}>
            <MoviesPoster id={item.id} poster={item.poster} />
          </View>
        )}
        onEndReached={() => fetchNextPage()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => (
          <View style={{ height: 100, justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="purple" />
          </View>
        )}
      />
    </View>
  );
};

export default AllMoviesScreen;
