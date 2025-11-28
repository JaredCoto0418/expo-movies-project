import { nowPlayingAction } from "@/core/actions/movies";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import React from "react";
import "../global.css";

const RootLayout = () => {
  const queryClient = new QueryClient();

  // Preload now playing movies without blocking
  nowPlayingAction().catch(() => {
    // Silently fail - will be fetched on demand
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }} />
    </QueryClientProvider>
  );
};

export default RootLayout;
