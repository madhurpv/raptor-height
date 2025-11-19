// src/components/Popup.js
import React, { useEffect } from "react";
import "./../styles/StartingInfo.css";

export default function StartingInfo({ onClose }) {

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div
        className="popup-card"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside card
      >
        <button className="popup-close" onClick={onClose}><b>✕</b></button>

        <div className="popup-scroll">
          <h2>Welcome to Bird Altitude Estimator!</h2>
          <p>This website helps you calculate the distance between your camera and the bird flying over you!</p>

          <p>How to use - </p>
          <ol>
            <li>Click on the 'Upload photo' button and select your image.</li>
            <li>Select the bird species present in the photo from the dropdown menu.</li>
            <li>Mark the bird's wingspan by clicking twice on the image.</li>
            <li>If the '35mm equivalent focal length' is not filled, enter it manually.</li>
            <li>'Distance' displays the calculated distance, while 'Estimated uncertainty' shows variation.</li>
          </ol>

          <p>The maths is based on simple trigonometric calculations.</p>

          <p>Things to keep in mind - </p>
          <ul>
            <li>This tool calculates camera-to-bird distance, not altitude.</li>
            <li>Use original, uncropped photos.</li>
            <li>Use images where wings are fully open and perpendicular to the camera.</li>
            <li>The tool is only as accurate as the image/data entered.</li>
            <li>Wingspan values use mean species data.</li>
            <li>Calculated wingspans are estimates; uncertainty varies.</li>
            <li>Uncertainty depends on species variability + pixel selection.</li>
          </ul>

          <p>If you find any errors, please feel free to contact me!</p>
        </div>
      </div>
    </div>
  );
}