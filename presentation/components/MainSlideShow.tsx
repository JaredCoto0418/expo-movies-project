import { Movie } from "@/infraestructure/interfaces";
import React, { useRef } from "react";
import { useWindowDimensions, View } from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import MoviesPoster from "./movies/MoviesPoster";

interface Props {
  movies: Movie[];
}

export const MainSlideShow = ({ movies }: Props) => {
  const ref = useRef<ICarouselInstance>(null);
  const width = useWindowDimensions().width;

  return (
    <View className="h-[250px] w-full">
      <Carousel
        data={movies}
        renderItem={({ item }) => (
          <MoviesPoster
            id={item.id}
            poster={item.poster}
            className="rounded-2xl"
          />
        )}
        ref={ref}
        width={200}
        height={350}
        style={{
          width: width,
          height: 350,
          justifyContent: "center",
          alignItems: "center",
        }}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        defaultIndex={1}
      ></Carousel>
    </View>
  );
};
