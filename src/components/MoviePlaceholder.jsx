import React from "react";
import { BiImage } from "react-icons/bi";

const MoviePlaceholder = () => {
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "2/3",
        backgroundColor: "#e0e0e0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "10px",
        color: "#9e9e9e",
      }}
    >
      <BiImage size={60} style={{ opacity: 0.6 }} />
    </div>
  );
};

export default MoviePlaceholder;
