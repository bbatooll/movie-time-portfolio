import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const [userEmail, setUserEmail] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    setUserEmail(email);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    setUserEmail("");
    setShowMenu(false);
    navigate("/");
  };

  const checkAuth = (e) => {
    if (!localStorage.getItem("userEmail")) {
      e.preventDefault();
      navigate("/");
    }
  };

  return (
    <header className="header">
      <div className="nav-container">
        <div className="logo">
          <span>MovieTime</span>
        </div>
        <ul className="list">
          <li>
            <Link to="/movies" onClick={checkAuth}>
              All Movies
            </Link>
          </li>
          <li>
            <Link to="/trending" onClick={checkAuth}>
              Trending
            </Link>
          </li>
          <li>
            <Link to="/top-rated" onClick={checkAuth}>
              Top Rated
            </Link>
          </li>
          <li>
            <Link to="/watchlist" onClick={checkAuth}>
              My Watchlist
            </Link>
          </li>
        </ul>
        <div className="user-section">
          {userEmail && (
            <div style={{ position: "relative" }}>
              <div
                className="avatar-circle"
                onClick={() => setShowMenu(!showMenu)}
              >
                {userEmail.charAt(0).toUpperCase()}
              </div>
              {showMenu && (
                <div className="dropdown-menu">
                  <p className="user-email-display">{userEmail}</p>
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
