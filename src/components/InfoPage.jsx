import React from "react";
import { useParams } from "react-router-dom";

const InfoPage = () => {
  const { type } = useParams();

  const content = {
    about: {
      title: "About MOVIETIME",
      description: "A simple and calm place to explore your favorite movies.",
      points: [
        "Discover the latest trending movies.",
        "Keep a personal list of what you want to watch.",
        "Simple and easy-to-use interface.",
        "Fast and reliable movie data.",
      ],
    },
    support: {
      title: "Support",
      description: "We are here to help you have the best experience:",
      points: [
        "Email us for any technical help.",
        "Report any bugs or issues you find.",
        "Suggest new features for the website.",
        "Help with managing your account.",
      ],
    },
    "help-center": {
      title: "Help Center",
      description: "Find quick answers to your questions:",
      points: [
        "How to search for specific movies.",
        "Adding movies to your watchlist.",
        "Changing your account preferences.",
        "Understanding movie ratings.",
      ],
    },
    terms: {
      title: "Terms of Use",
      description: "Simple rules for using our website:",
      points: [
        "Use the site for your personal enjoyment.",
        "Respect the content and data provided.",
        "Do not use the data for commercial work.",
        "Follow digital safety guidelines.",
      ],
    },
  };

  const page = content[type] || {
    title: "Page Not Found",
    description: "Sorry, this page does not exist.",
    points: [],
  };

  return (
    <div
      style={{
        padding: "120px 20px",
        maxWidth: "800px",
        margin: "0 auto",
        minHeight: "60vh",
      }}
    >
      <h1
        style={{
          color: "#01579b",
          marginBottom: "30px",
          fontSize: "2.8rem",
          textAlign: "center",
          fontWeight: "900",
        }}
      >
        {page.title}
      </h1>

      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "40px",
          borderRadius: "24px",
          boxShadow: "0 10px 30px rgba(2, 136, 209, 0.05)",
          border: "1px solid #e3f2fd",
        }}
      >
        <p
          style={{
            color: "#0277bd",
            fontSize: "1.4rem",
            marginBottom: "30px",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          {page.description}
        </p>

        {page.points.length > 0 && (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {page.points.map((point, index) => (
              <li
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  padding: "15px",
                  marginBottom: "10px",
                  color: "#01579b",
                  fontSize: "1.1rem",
                  backgroundColor: "#f8faff",
                  borderRadius: "12px",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "#0288d1",
                    borderRadius: "50%",
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                ></span>
                {point}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default InfoPage;
