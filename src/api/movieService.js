import axiosInstance from "./axiosInstance";

export const movieService = {
  getPopularMovies: async (page) => {
    const res = await axiosInstance.get("/movie/popular", {
      params: { page },
    });
    return res.data;
  },

  getTopRatedMovies: async (page) => {
    const res = await axiosInstance.get("/movie/top_rated", {
      params: { page },
    });
    return res.data;
  },

  getTrendingMovies: async (page) => {
    const res = await axiosInstance.get("/trending/movie/day", {
      params: { page },
    });
    return res.data;
  },

  getMovieDetails: async (id) => {
    const res = await axiosInstance.get(`/movie/${id}`);
    return res.data;
  },
};
