const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "891d0e4c4700565fa5459e948f47c4ca";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export const API_ENDPOINTS = {
  POPULAR: (page) =>
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`,
  TOP_RATED: (page) =>
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`,
  TRENDING: (page) =>
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${page}`,
  DETAILS: (id) => `${BASE_URL}/movie/${id}?api_key=${API_KEY}`,
  LOGIN: "https://reqres.in/api/login",
};

export const IMAGE_URLS = {
  POSTER: (path) => `${IMAGE_BASE_URL}/w500${path}`,
  BACKDROP: (path) => `${IMAGE_BASE_URL}/original${path}`,
};
