import React, { useState, useEffect } from "react";
import logo from "../assets/Logo.jpg"; // optional

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);

  // When dark mode changes, toggle class on body (for global theme)
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const headerStyle = {
    background: darkMode
      ? "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)"
      : "linear-gradient(135deg, #fdfdfd 0%, #f5f7fa 100%)",
    color: darkMode ? "#e2e8f0" : "#111827",
    borderRadius: "16px",
    padding: "18px 22px",
    boxShadow: darkMode
      ? "0 2px 6px rgba(255,255,255,0.05)"
      : "0 2px 6px rgba(0, 0, 0, 0.08)",
    margin: "0px auto 2px",
    maxWidth: "1100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transition: "all 0.5s ease",
  };

  const logoStyle = {
    width: "80px",
    height: "80px",
    borderRadius: "10px",
    objectFit: "cover",
    boxShadow: darkMode
      ? "0 1px 4px rgba(255,255,255,0.15)"
      : "0 1px 4px rgba(0,0,0,0.1)",
    transition: "transform 0.2s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  };

  const buttonStyle = {
    background: darkMode ? "#334155" : "#e2e8f0",
    color: darkMode ? "#f8fafc" : "#1e293b",
    border: "none",
    borderRadius: "20px",
    padding: "8px 14px",
    cursor: "pointer",
    fontWeight: 500,
    fontSize: "0.9rem",
    transition: "all 0.4s ease",
    boxShadow: darkMode
      ? "0 1px 3px rgba(255,255,255,0.15)"
      : "0 1px 3px rgba(0,0,0,0.15)",
  };

  return (
    <header style={headerStyle}>
      {/* Left section: Logo + Title */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {logo && (
          <img
            src={logo}
            alt="Logo"
            style={logoStyle}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        )}

        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1
            style={{
              fontSize: "1.6rem",
              fontWeight: "600",
              margin: 0,
              color: darkMode ? "#f1f5f9" : "#333",
              transition: "color 0.4s ease",
            }}
          >
            Bird Altitude Estimator
          </h1>
          <p
            style={{
              margin: "2px 0 0",
              fontSize: "0.95rem",
              color: darkMode ? "#94a3b8" : "#555",
              transition: "color 0.4s ease",
            }}
          >
            Estimate distance from bird photos
          </p>
        </div>
      </div>

      {/* Right section: Dark Mode toggle */}
      <button
        onClick={toggleDarkMode}
        style={buttonStyle}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = darkMode ? "#475569" : "#cbd5e1")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = darkMode ? "#334155" : "#e2e8f0")
        }
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </header>
  );
}
