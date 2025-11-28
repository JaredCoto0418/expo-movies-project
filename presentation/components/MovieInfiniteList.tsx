import { Movie } from "@/infraestructure/interfaces";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  ListRenderItem,
} from "react-native";
import MoviesPoster from "./movies/MoviesPoster";

interface Props {
  movies: Movie[];
  title?: string;
  onEndReached?: () => void;
  isLoading?: boolean;
  hasNextPage?: boolean;
}

const MovieInfiniteList = ({
  movies,
  title = "",
  onEndReached,
  isLoading = false,
  hasNextPage = false,
}: Props) => {
  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <View className="py-4">
        <ActivityIndicator color="purple" size="large" />
      </View>
    );
  };

  const renderItem: ListRenderItem<Movie> = ({ item }: { item: Movie }) => (
    <View className="mb-4 w-1/2">
      <MoviesPoster
        id={item.id}
        poster={item.poster}
        className="rounded-lg"
      />
    </View>
  );

  return (
    <View className="flex-1">
      <Text className="text-2xl font-bold px-4 mb-2">{title}</Text>
      <FlatList
        data={movies}
        keyExtractor={(item: Movie) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-around", paddingHorizontal: 8 }}
        renderItem={renderItem}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        scrollEnabled={false}
      />
    </View>
  );
};

export default MovieInfiniteList;
