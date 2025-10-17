// src/data/speciesData.js
// All wingspans are in meters (m)

const speciesData = [
  {
    id: "blackkite",
    name: "Black Kite (1.5m)",
    wingspan_m: 1.5,
    variance: 0.01
  },
  {
    id: "blackkite_govinda",
    name: "Black Kite (Govinda) (1.36m)",
    wingspan_m: 1.36,
    variance: 0.01,
    source: "Aarti Sharma, A. S., & Dubal, S. C. (2016). Aerodynamical measurements of the small Indian kite (Milvus migrans govinda)."
  },
  {
    id: "commonkestrel",
    name: "Common Kestrel (0.68m)",
    wingspan_m: 0.68,
    variance: 0.11,
    source: "Ferguson-Lees, J., and D. A. Christie (2001). Raptors of the World. Christopher Helm, London, United Kingdom., as cited in Orta, J., P. F. D. Boesman, and J. S. Marks (2020). Eurasian Kestrel (Falco tinnunculus), version 1.0. In Birds of the World (S. M. Billerman, B. K. Keeney, P. G. Rodewald, and T. S. Schulenberg, Editors). Cornell Lab of Ornithology, Ithaca, NY, USA. https://doi.org/10.2173/bow.eurkes.01"
  },
];

export default speciesData;
