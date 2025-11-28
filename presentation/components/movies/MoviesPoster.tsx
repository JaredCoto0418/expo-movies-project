import { router } from "expo-router";
import React from "react";
import { Image, Pressable } from "react-native";

interface Props {
  poster: string;
  id: number;
  smallPoster?: boolean;
  className?: string;
}

const MoviesPoster = ({
  id,
  poster,
  smallPoster = false,
  className,
}: Props) => {
  const handlePress = () => {
    router.push(`/movie/${id}`);
  };

  return (
    <Pressable
      className={`active:opacity-90 px-2 ${className}`}
      onPress={handlePress}
    >
      <Image
        source={{ uri: `${poster}` }}
        className="shadow-lg rounded-2xl w-full h-full"
        style={{
          width: smallPoster ? 85 : 150,
          height: smallPoster ? 130 : 250,
        }}
        resizeMode="cover"
      ></Image>
    </Pressable>
  );
};

export default MoviesPoster;
