import React from "react";
import logo from "../assets/Logo.jpg"; // optional

export default function Header() {
  return (
    <header
      style={{
        background: "linear-gradient(135deg, #fdfdfd 0%, #f5f7fa 100%)",
        borderRadius: "16px",
        padding: "22px 20px", // reduced height
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
        margin: "16px auto 2px",
        maxWidth: "1100px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
      }}
    >
      {/* Logo */}
      {logo && (
        <img
          src={logo}
          alt="Logo"
          style={{
            width: "98px", // smaller logo
            height: "98px",
            borderRadius: "10px",
            objectFit: "cover",
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
            transition: "transform 0.2s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
      )}

      {/* Title + Subtitle */}
      <div style={{ display: "flex", flexDirection: "column"}}>
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            margin: 0,
            marginLeft: 5,
            color: "#333",
            transition: "color 0.2s ease",
            cursor: "default",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#1d4ed8")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
        >
          Bird Wingspan Estimator
        </h1>
        <p
          style={{
            margin: "2px 0 0",
            fontSize: "0.95rem",
            color: "#555",
            marginLeft: 5
          }}
        >
          Estimate distance and altitude from bird photos
        </p>
      </div>
    </header>
  );
}
