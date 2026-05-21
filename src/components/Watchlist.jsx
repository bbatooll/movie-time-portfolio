import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { IMAGE_URLS } from "../apiConfig";

const Watchlist = () => {
  const [list, setList] = useState([]);
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (userEmail) {
      const saved =
        JSON.parse(localStorage.getItem(`watchlist_${userEmail}`)) || [];
      setList(saved);
    }
  }, [userEmail]);

  const removeMovie = (id) => {
    const newList = list.filter((m) => m.id !== id);
    setList(newList);
    localStorage.setItem(`watchlist_${userEmail}`, JSON.stringify(newList));
  };

  return (
    <div className="main-page-container">
      <div className="movies-grid-container">
        <h2 className="grid-title">My Watchlist</h2>
        <div className="movies-grid">
          {list.length > 0 ? (
            list.map((movie) => (
              <div key={movie.id} className="movie-card">
                <button
                  className="watchlist-icon"
                  onClick={() => removeMovie(movie.id)}
                  style={{
                    color: "red",
                    fontSize: "24px",
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    zIndex: 10,
                  }}
                >
                  ❤️
                </button>

                <Link
                  to={`/movie/${movie.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img
                    src={IMAGE_URLS.POSTER(movie.poster_path)}
                    alt={movie.title}
                  />
                  <div className="movie-info">
                    <h3>{movie.title}</h3>
                    {movie.vote_average && (
                      <span className="rating-tag">
                        ⭐ {movie.vote_average.toFixed(1)}
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p className="empty-msg">
                Your watchlist is empty. Go add some movies! 🍿
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
