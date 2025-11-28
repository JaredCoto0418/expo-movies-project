import { Movie } from "@/infraestructure/interfaces";
import React from "react";
import { FlatList, Text, View } from "react-native";
import MoviesPoster from "./movies/MoviesPoster";
interface Props {
  movies: Movie[];
  title?: string;
  loadNextPage?: () => void;
}

const MovieHorizontalList = ({ movies, title = "", loadNextPage }: Props) => {
  return (
    <View>
      <Text className="text-2xl font-bold px-4 mb-2">{title}</Text>
      <FlatList
        horizontal
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        onEndReached={loadNextPage}
        onEndReachedThreshold={0.5}
        renderItem={(item) => (
          <MoviesPoster
            id={item.item.id}
            poster={item.item.poster}
            smallPoster={true}
          />
        )}
      />
    </View>
  );
};

export default MovieHorizontalList;
