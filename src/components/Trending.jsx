import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate, Link, useSearchParams } from "react-router-dom";

import { IMAGE_URLS } from "../apiConfig";
import { movieService } from "../api/movieService";

const Trending = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [watchlist, setWatchlist] = useState([]);
  const navigate = useNavigate();
  const user = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const data = await movieService.getTrendingMovies(page);
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

    const updatedList = isExist
      ? currentList.filter((m) => m.id !== movie.id)
      : [...currentList, movie];

    localStorage.setItem(`watchlist_${user}`, JSON.stringify(updatedList));
    setWatchlist(updatedList);
  };

  if (loading) {
    return <div className="loader">Loading Trending...</div>;
  }

  return (
    <div className="main-page-container">
      <div className="movies-grid-container">
        <h2 className="grid-title">Trending Movies</h2>

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
                  <img
                    src={IMAGE_URLS.POSTER(movie.poster_path)}
                    alt={movie.title}
                  />

                  <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <span className="rating-tag">
                      ⭐ {movie.vote_average.toFixed(1)}
                    </span>
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

export default Trending;
