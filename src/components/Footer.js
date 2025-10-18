import React from "react";
import "../styles/MainPage.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Bird Altitude Estimator — by Madhur Vaidya</p>
    </footer>
  );
}
