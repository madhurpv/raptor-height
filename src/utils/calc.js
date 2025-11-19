// Calculation utilities
export function pixelsDistance(pt1, pt2) {
  const dx = pt2[0] - pt1[0];
  const dy = pt2[1] - pt1[1];
  return Math.sqrt(dx * dx + dy * dy);
}


// Main distance formula using 35-mm equivalent focal length and 3:2 images
// D (metres) = (L (metres) * f35 (mm) * W_px) / (36 * s_px)
export function computeDistanceMeters({ L_m, f35_mm, W_px, s_px }) {
  if (!s_px || s_px <= 0) return null;
  const D = (L_m * f35_mm * W_px) / (36 * s_px);
  return D;
}

// Simple relative uncertainty estimate (conservative sum of relative errors)
export function estimateRelativeUncertainty({ delta_f35_mm, delta_L_m, delta_s_px, f35_mm, L_m, s_px, selectedSpecies, altitude }) {
  // if inputs missing, return null
  if (!f35_mm || !L_m || !s_px || !selectedSpecies || !altitude) return null;
  /*OLD : const relF = Math.abs(delta_f35_mm || 0) / f35_mm;
  const relL = Math.abs(delta_L_m || 0) / L_m;
  const relS = Math.abs(delta_s_px || 0) / s_px;
  return relF + relL + relS; // fraction (e.g., 0.05 = 5%)*/

  //console.log(s_px);
  return (selectedSpecies.variance)/selectedSpecies.wingspan_m + 1/(10*s_px);   // 1/(10*s_px) ensures that smaller widths in pixels are penalized more, as those have greater possibility of error
}
