import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { IMAGE_URLS } from "../apiConfig";
import { movieService } from "../api/movieService";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await movieService.getMovieDetails(id);
        setMovie(data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (loading) return <div className="loader">Loading Details...</div>;
  if (!movie) return <div>Not Found</div>;

  return (
    <div
      className="movie-details-container"
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#6a6767",
        color: "white",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${IMAGE_URLS.BACKDROP(movie.backdrop_path)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.3,
          filter: "blur(8px)",
          zIndex: 0,
        }}
      ></div>

      <div
        className="main-page-container"
        style={{ position: "relative", zIndex: 1, padding: "40px" }}
      >
        <div
          style={{
            display: "flex",
            gap: "40px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          <img
            src={IMAGE_URLS.POSTER(movie.poster_path)}
            alt={movie.title}
            style={{
              width: "300px",
              borderRadius: "15px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            }}
          />

          <div style={{ flex: 1, minWidth: "300px" }}>
            <h1 style={{ fontSize: "3rem", marginBottom: "10px" }}>
              {movie.title}
            </h1>

            <div
              style={{
                display: "flex",
                gap: "15px",
                alignItems: "center",
                marginBottom: "20px",
                color: "#ccc",
              }}
            >
              <span>{movie.release_date?.split("-")[0]}</span>
              <span>•</span>
              <span>{movie.runtime} min</span>
              <div style={{ display: "flex", gap: "10px" }}>
                {movie.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    style={{
                      border: "1px solid #666",
                      padding: "2px 10px",
                      borderRadius: "20px",
                      fontSize: "0.8rem",
                    }}
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            <p
              style={{
                fontSize: "1.1rem",
                lineHeight: "1.6",
                maxWidth: "800px",
                color: "#ddd",
              }}
            >
              {movie.overview}
            </p>

            <div
              style={{
                marginTop: "30px",
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              {movie.vote_average !== undefined && (
                <div
                  style={{
                    backgroundColor: "#ffc107",
                    color: "black",
                    padding: "8px 15px",
                    borderRadius: "20px",
                    fontWeight: "bold",
                  }}
                >
                  ⭐ {movie.vote_average.toFixed(1)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
