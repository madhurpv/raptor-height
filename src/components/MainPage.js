import React, { useState, useEffect } from "react";
import ImagePicker from "./ImagePicker.js";
import CanvasPicker from "./CanvasPicker.js";
import SpeciesSelector from "./SpeciesSelector.js";
import {
  computeDistanceMeters,
  estimateRelativeUncertainty,
  pixelsDistance,
} from "../utils/calc.js";
import speciesData from "../data/speciesData.js";
import "../styles/MainPage.css";

export default function MainPage() {
  const [imageSrc, setImageSrc] = useState(null);
  const [points, setPoints] = useState([]);
  const [f35, setF35] = useState(200);
  const [cameraHeight, setCameraHeight] = useState(1.7);
  const [selectedSpeciesId, setSelectedSpeciesId] = useState(null);
  const [manualWingspan, setManualWingspan] = useState("");
  const [halfWing, setHalfWing] = useState(false);
  const [distance, setDistance] = useState(null);
  const [altitude, setAltitude] = useState(null);
  const [uncertainty, setUncertainty] = useState(null);
  const [imgSize, setImgSize] = useState({ w: 0, h: 0 });

  const selectedSpecies = speciesData.find((s) => s.id === selectedSpeciesId);

  useEffect(() => {
    if (!imageSrc || points.length !== 2) {
      setDistance(null);
      setAltitude(null);
      setUncertainty(null);
      return;
    }

    let sPx = pixelsDistance(points[0], points[1]);
    if (halfWing) sPx *= 2;

    const img = new window.Image();
    img.onload = () => {
      const W_px = img.naturalWidth;
      const H_px = img.naturalHeight;
      setImgSize({ w: W_px, h: H_px });

      const L_m = selectedSpeciesId
        ? selectedSpecies?.wingspan_m
        : parseFloat(manualWingspan);

      if (!L_m || !f35) {
        setDistance(null);
        setAltitude(null);
        setUncertainty(null);
        return;
      }

      const D = computeDistanceMeters({
        L_m,
        f35_mm: parseFloat(f35),
        W_px,
        s_px: sPx,
      });
      setDistance(D);
      setAltitude((parseFloat(cameraHeight) || 0) + D);

      const deltaF = 1;
      const deltaL = Math.max(0.05, 0.05 * L_m);
      const deltaS = 2;
      const uq = estimateRelativeUncertainty({
        delta_f35_mm: deltaF,
        delta_L_m: deltaL,
        delta_s_px: deltaS,
        f35_mm: parseFloat(f35),
        L_m,
        s_px: sPx,
      });
      setUncertainty(uq);
    };
    img.src = imageSrc;
  }, [imageSrc, points, f35, selectedSpeciesId, manualWingspan, cameraHeight, halfWing]);

  function handleImage(src, focal35) {
    setImageSrc(src);
    setPoints([]);
    setDistance(null);
    setAltitude(null);
    setUncertainty(null);

    if (focal35 && !isNaN(focal35)) {
      setF35(parseFloat(focal35));
      console.log("Auto-detected 35 mm equivalent focal length:", focal35);
    }
  }

  function handleReset() {
    setImageSrc(null);
    setPoints([]);
    setDistance(null);
    setAltitude(null);
    setUncertainty(null);
    setSelectedSpeciesId(null);
    setManualWingspan("");
    setHalfWing(false);
    setF35(200);
    setCameraHeight(1.7);
  }

  return (
    <div className="main-container">
      {/* LEFT PANEL - controls */}
      <div className="controls-panel">
        <h2>Inputs</h2>

        <SpeciesSelector
          speciesList={speciesData}
          selectedId={selectedSpeciesId}
          onSelect={(id) => setSelectedSpeciesId(id)}
        />

        {!selectedSpeciesId && (
          <div className="input-group">
            <label>Manual wingspan (m)</label>
            <input
              className="input"
              type="number"
              step="0.01"
              placeholder="e.g. 1.2"
              value={manualWingspan}
              onChange={(e) => setManualWingspan(e.target.value)}
            />
          </div>
        )}

        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={halfWing}
              onChange={(e) => setHalfWing(e.target.checked)}
            />
            Half-wing mode (multiply measured wingspan by 2)
          </label>
        </div>

        <div className="double-input">
          <div>
            <label>35mm equivalent focal length</label>
            <input
              className="input"
              type="number"
              value={f35}
              onChange={(e) => setF35(e.target.value)}
            />
          </div>
          <div>
            <label>Camera height (m)</label>
            <input
              className="input"
              type="number"
              value={cameraHeight}
              onChange={(e) => setCameraHeight(e.target.value)}
            />
          </div>
        </div>

        <div className="action-buttons">
          <ImagePicker onImage={handleImage} />
          <button className="btn secondary" onClick={handleReset}>
            Reset
          </button>
        </div>

        <div className="results">
          <div>Distance: {distance ? `${distance.toFixed(2)} m` : "—"}</div>
          <div>Altitude: {altitude ? `${altitude.toFixed(2)} m` : "—"}</div>
          {uncertainty != null && (
            <div className="footer-note">
              Estimated uncertainty: ±{(uncertainty * 100).toFixed(1)}%
            </div>
          )}
        </div>
      </div>

      {/* RIGHT PANEL - image */}
      <div className="canvas-panel">
        <CanvasPicker src={imageSrc} onPointsChange={(pts) => setPoints(pts)} />
      </div>
    </div>
  );
}
