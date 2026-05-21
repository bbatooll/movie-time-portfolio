import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content-centered">
        <h2 className="footer-logo">MOVIETIME</h2>

        <div className="footer-links-row">
          <Link to="/info/about">About</Link>
          <Link to="/info/terms">Terms</Link>
          <Link to="/info/help-center">Help Center</Link>
          <Link to="/info/support">Support</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} MOVIETIME. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
