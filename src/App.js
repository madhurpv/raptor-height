import React, { useState, useEffect } from 'react';
import ImagePicker from './components/ImagePicker.js';
import CanvasPicker from './components/CanvasPicker.js';
import SpeciesSelector from './components/SpeciesSelector.js';
import { computeDistanceMeters, estimateRelativeUncertainty, pixelsDistance } from './utils/calc.js';
import speciesData from './data/speciesData.js';




/* TODO : 

1. Correct RESET button
2. Add reset wingspan markers button
3. Add warnings and pitfalls
4. User guide
5. User video
6. Maths explaining document
7. Change titlebar title
8. Add h1 heading (and logo) on page
9. Mobile optimize
10. Better uncertainity

*/


export default function App() {
  const [imageSrc, setImageSrc] = useState(null);
  const [points, setPoints] = useState([]);
  const [f35, setF35] = useState(200);
  const [cameraHeight, setCameraHeight] = useState(1.7);

  // default to Manual Entry
  const [selectedSpeciesId, setSelectedSpeciesId] = useState('manual');
  const [manualWingspan, setManualWingspan] = useState('');
  const [halfWing, setHalfWing] = useState(false); // new half-wing mode

  const [distance, setDistance] = useState(null);
  const [altitude, setAltitude] = useState(null);
  const [uncertainty, setUncertainty] = useState(null);
  const [imgSize, setImgSize] = useState({ w: 0, h: 0 });

  // species list including Manual Entry
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

    // Get measured pixel distance between points
    let sPx = pixelsDistance(points[0], points[1]);
    if (halfWing) sPx *= 2; // double measured pixel distance in half-wing mode

    const img = new window.Image();
    img.onload = () => {
      const W_px = img.naturalWidth;
      const H_px = img.naturalHeight;
      setImgSize({ w: W_px, h: H_px });

      // Choose wingspan based on species or manual input
      const L_m = selectedSpeciesId === 'manual'
        ? parseFloat(manualWingspan)
        : selectedSpecies?.wingspan_m;

      if (!L_m || !f35) {
        setDistance(null);
        setAltitude(null);
        setUncertainty(null);
        return;
      }

      // Compute real-world distance
      const D = computeDistanceMeters({
        L_m,
        f35_mm: parseFloat(f35),
        W_px,
        s_px: sPx
      });
      setDistance(D);
      setAltitude((parseFloat(cameraHeight) || 0) + D);

      // Uncertainty estimate
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
    <div className="app">
      {/* LEFT column */}
      <div className="left-panel">
        <div className="panel">
          <div className="header">Inputs</div>

          {/* Species Selector */}
          <div style={{ marginBottom: 10 }}>
            <SpeciesSelector
              speciesList={speciesList}
              selectedId={selectedSpeciesId}
              onSelect={(id) => setSelectedSpeciesId(id)}
            />
          </div>

          {/* Manual wingspan input */}
          {selectedSpeciesId === 'manual' && (
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
            <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <input
                type="checkbox"
                checked={halfWing}
                onChange={(e) => setHalfWing(e.target.checked)}
              />
              Half-wing mode (multiply measured wingspan by 2)
            </label>
          </div>

          {/* Camera inputs */}
          <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
            <div style={{ flex: 1 }}>
              <label className="small">35-mm equivalent focal length</label>
              <input className="input" type="number" value={f35} onChange={(e) => setF35(e.target.value)} />
            </div>
            <div style={{ width: 110 }}>
              <label className="small">Camera height (m)</label>
              <input className="input" type="number" value={cameraHeight} onChange={(e) => setCameraHeight(e.target.value)} />
            </div>
          </div>

          {/* Image Picker + Reset */}
          <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
            <ImagePicker onImage={handleImage} />
            <button className="btn secondary" onClick={handleReset}>Reset</button>
          </div>

          {/* Results */}
          <div className="results" style={{ marginTop: 12 }}>
            <div className="value">Distance: {distance ? `${distance.toFixed(2)} m` : '—'}</div>
            <div className="value">Altitude: {altitude ? `${altitude.toFixed(2)} m` : '—'}</div>
            {uncertainty != null && <div className="footer-note">Estimated uncertainty: ±{(uncertainty * 100).toFixed(1)}%</div>}
          </div>
        </div>
      </div>

      {/* RIGHT column */}
      <div className="right-panel">
        <div className="panel img-wrap">
          <CanvasPicker src={imageSrc} onPointsChange={(pts) => setPoints(pts)} />
          <div className="readout" aria-hidden>
            {points.length === 2
              ? `Pixel-width wingspan: ${Math.round(pixelsDistance(points[0], points[1]) * (halfWing ? 2 : 1))}`
              : 'Click two wing tips'}
          </div>
        </div>
      </div>
    </div>
  );
}
