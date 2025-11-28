import axios from "axios";

// TMDB API Configuration
const TMDB_API_KEY = process.env.EXPO_PUBLIC_MOVIE_API_KEY || "5a318505918b8d14907c5441b4551d5a"; // API Key provided by user
const TMDB_BASE_URL = process.env.EXPO_PUBLIC_MOVIE_API_URL || "https://api.themoviedb.org/3";

//conexion a la api de movie
export const moviesApi = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    language: 'es-ES',
    api_key: TMDB_API_KEY
  }
});