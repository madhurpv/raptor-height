import React, { useState, useEffect } from 'react';
import ImagePicker from './ImagePicker.js';
import CanvasPicker from './CanvasPicker.js';
import SpeciesSelector from './SpeciesSelector.js';
import { computeDistanceMeters, estimateRelativeUncertainty, pixelsDistance } from '../utils/calc.js';
import speciesData from '../data/speciesData.js';

export default function MainPage() {
  const [imageSrc, setImageSrc] = useState(null);
  const [points, setPoints] = useState([]);
  const [f35, setF35] = useState(200);
  const [cameraHeight, setCameraHeight] = useState(1.7);

  const [selectedSpeciesId, setSelectedSpeciesId] = useState('manual');
  const [manualWingspan, setManualWingspan] = useState('');
  const [halfWing, setHalfWing] = useState(false);

  const [distance, setDistance] = useState(null);
  const [altitude, setAltitude] = useState(null);
  const [uncertainty, setUncertainty] = useState(null);
  const [imgSize, setImgSize] = useState({ w: 0, h: 0 });

  const speciesList = [
    { id: 'manual', name: 'Manual Entry', wingspan_m: null, variance: null },
    ...speciesData
  ];

  const selectedSpecies = speciesList.find(s => s.id === selectedSpeciesId);

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

      const L_m = selectedSpeciesId === 'manual'
        ? parseFloat(manualWingspan)
        : selectedSpecies?.wingspan_m;

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
        s_px: sPx
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
        s_px: sPx
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
      console.log('Auto-detected 35 mm equivalent focal length:', focal35);
    }
  }

  function handleReset() {
    setImageSrc(null);
    setPoints([]);
    setDistance(null);
    setAltitude(null);
    setUncertainty(null);
    setSelectedSpeciesId('manual');
    setManualWingspan('');
    setHalfWing(false);
    setF35(200);
    setCameraHeight(1.7);
  }

  return (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "20px",
      padding: "20px",
      flexWrap: "wrap", // enables responsive stacking
    }}
  >
    {/* LEFT PANEL - controls */}
    <div
      style={{
        flex: "1 1 350px",
        minWidth: "300px",
        maxWidth: "400px",
        background: "#fafafa",
        padding: "16px",
        borderRadius: "12px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ marginBottom: "12px" }}>Inputs</h2>

      {/* Species Selector */}
      <div style={{ marginBottom: 10 }}>
        <SpeciesSelector
          speciesList={speciesList}
          selectedId={selectedSpeciesId}
          onSelect={(id) => setSelectedSpeciesId(id)}
        />
      </div>

      {/* Manual wingspan input */}
      {selectedSpeciesId === "manual" && (
        <div style={{ marginBottom: 10 }}>
          <label className="small">Manual wingspan (m)</label>
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

      {/* Half-wing mode checkbox */}
      <div style={{ marginBottom: 10 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <input
            type="checkbox"
            checked={halfWing}
            onChange={(e) => setHalfWing(e.target.checked)}
          />
          Half-wing mode (multiply measured wingspan by 2)
        </label>
      </div>

      {/* Camera inputs */}
      <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
        <div style={{ flex: 1 }}>
          <label className="small">35-mm equivalent focal length</label>
          <input
            className="input"
            type="number"
            value={f35}
            onChange={(e) => setF35(e.target.value)}
          />
        </div>
        <div style={{ width: 110 }}>
          <label className="small">Camera height (m)</label>
          <input
            className="input"
            type="number"
            value={cameraHeight}
            onChange={(e) => setCameraHeight(e.target.value)}
          />
        </div>
      </div>

      {/* Image Picker + Reset */}
      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <ImagePicker onImage={handleImage} />
        <button className="btn secondary" onClick={handleReset}>
          Reset
        </button>
      </div>

      {/* Results */}
      <div className="results" style={{ marginTop: 12 }}>
        <div className="value">
          Distance: {distance ? `${distance.toFixed(2)} m` : "—"}
        </div>
        <div className="value">
          Altitude: {altitude ? `${altitude.toFixed(2)} m` : "—"}
        </div>
        {uncertainty != null && (
          <div className="footer-note">
            Estimated uncertainty: ±{(uncertainty * 100).toFixed(1)}%
          </div>
        )}
      </div>
    </div>

    {/* RIGHT PANEL - image & canvas */}
    <div
      style={{
        flex: "2 1 600px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        padding: "10px",
      }}
    >
      <CanvasPicker src={imageSrc} onPointsChange={(pts) => setPoints(pts)} />
      {/*<div className="readout" style={{ marginTop: 8 }}>
        {points.length === 2
          ? `Pixel-width wingspan: ${Math.round(
              pixelsDistance(points[0], points[1]) * (halfWing ? 2 : 1)
            )}`
          : "Click two wing tips"}
      </div>*/}
    </div>
  </div>
);

}
