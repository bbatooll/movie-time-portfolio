import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate, Link, useSearchParams } from "react-router-dom";

import { IMAGE_URLS } from "../apiConfig";
import MoviePlaceholder from "./MoviePlaceholder";
import { movieService } from "../api/movieService";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const [totalPages, setTotalPages] = useState(1);
  const [watchlist, setWatchlist] = useState([]);
  const navigate = useNavigate();
  const user = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const data = await movieService.getPopularMovies(page);
        setMovies(data.results);
        setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
        setLoading(false);
        window.scrollTo(0, 0);
      } catch (e) {
        setLoading(false);
      }
    };
    fetchMovies();

    if (user) {
      const currentList =
        JSON.parse(localStorage.getItem(`watchlist_${user}`)) || [];
      setWatchlist(currentList);
    }
  }, [page, user]);

  const handlePageChange = (data) => {
    const selectedPage = data.selected + 1;
    setSearchParams({ page: selectedPage });
  };

  const handleToggleWatchlist = (movie) => {
    if (!user) {
      navigate("/");
      return;
    }
    const currentList =
      JSON.parse(localStorage.getItem(`watchlist_${user}`)) || [];
    const isExist = currentList.find((m) => m.id === movie.id);
    let updatedList = isExist
      ? currentList.filter((m) => m.id !== movie.id)
      : [...currentList, movie];
    localStorage.setItem(`watchlist_${user}`, JSON.stringify(updatedList));
    setWatchlist(updatedList);
  };

  if (loading) return <div className="loader">Loading...</div>;

  const heroMovie = movies[0];

  return (
    <div className="main-page-container">
      {heroMovie && page === 1 && (
        <div
          className="hero-section"
          style={{
            backgroundImage: heroMovie.backdrop_path
              ? `url(${IMAGE_URLS.BACKDROP(heroMovie.backdrop_path)})`
              : "none",
            backgroundColor: heroMovie.backdrop_path ? "transparent" : "#222",
          }}
        >
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1 className="hero-title">{heroMovie.title}</h1>
            <p
              style={{
                color: "white",
                marginBottom: "20px",
                fontSize: "0.95rem",
                lineHeight: "1.5",
              }}
            >
              {heroMovie.overview.length > 200
                ? heroMovie.overview.substring(0, 200) + "..."
                : heroMovie.overview}
            </p>
            <div
              className="hero-buttons"
              style={{ display: "flex", gap: "15px" }}
            >
              <Link to={`/movie/${heroMovie.id}`} className="btn-watch-now">
                Show
              </Link>
              <button
                className="btn-watch-now"
                style={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(5px)",
                }}
                onClick={() => handleToggleWatchlist(heroMovie)}
              >
                {watchlist.find((m) => m.id === heroMovie.id)
                  ? "❤️ Saved"
                  : "♡ Add List"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="movies-grid-container">
        <h2 className="grid-title">All Movies</h2>
        <div className="movies-grid">
          {movies.map((movie) => {
            const isInWatchlist = watchlist.find((m) => m.id === movie.id);
            return (
              <div key={movie.id} className="movie-card">
                <button
                  className={`watchlist-icon ${isInWatchlist ? "active" : ""}`}
                  onClick={() => handleToggleWatchlist(movie)}
                >
                  {isInWatchlist ? "❤️" : "♡"}
                </button>
                <Link
                  to={`/movie/${movie.id}`}
                  style={{ textDecoration: "none" }}
                >
                  {movie.poster_path ? (
                    <img
                      src={IMAGE_URLS.POSTER(movie.poster_path)}
                      alt={movie.title}
                    />
                  ) : (
                    <MoviePlaceholder />
                  )}
                  <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <p className="rating-tag">
                      ⭐ {movie.vote_average.toFixed(1)}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={totalPages}
          forcePage={page - 1}
          onPageChange={handlePageChange}
          containerClassName={"pagination-container"}
          pageLinkClassName={"page-link"}
          previousLinkClassName={"page-link"}
          nextLinkClassName={"page-link"}
          disabledLinkClassName={"disabled"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
};

export default Movies;
