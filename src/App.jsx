import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/login/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Movies from "./components/Movies";
import Trending from "./components/Trending";
import Top from "./components/Top";
import Watchlist from "./components/Watchlist";
import MovieDetails from "./components/MovieDetails";
import InfoPage from "./components/InfoPage";
import "./styles.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />

        <main className="main-page-container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/top-rated" element={<Top />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/info/:type" element={<InfoPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
