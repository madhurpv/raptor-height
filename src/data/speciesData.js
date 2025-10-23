// src/data/speciesData.js
// All wingspans are in meters (m)

//
// NOTE : Bird Wingspans are mostly for India only.
//

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
  {
    id: "crestedserpanteagle",
    name: "Crested Serpant Eagle (1.39m)",
    wingspan_m: 1.39,
    variance: 0.30,
    source: "Clark, W. S., J. S. Marks, and G. M. Kirwan (2020). Crested Serpent-Eagle (Spilornis cheela), version 1.0. In Birds of the World (J. del Hoyo, A. Elliott, J. Sargatal, D. A. Christie, and E. de Juana, Editors). Cornell Lab of Ornithology, Ithaca, NY, USA. https://doi.org/10.2173/bow.crseag1.01"
  },
  {
    id: "changeablehawkeagle",
    name: "Changeable Hawk Eagle (1.32m)",
    wingspan_m: 1.32,
    variance: 0.05,
    source: "http://eagleencyclopedia.org/species/crested_hawk_eagle.html"
  },
  {
    id: "blackeagle",
    name: "Black Eagle (1.65m)",
    wingspan_m: 1.65,
    variance: 0.17,
    source: "Ferguson-Lees, J., and D. A. Christie (2001). Raptors of the World. Christopher Helm, London, United Kingdom., as cited in Clark, W. S., J. S. Marks, G. M. Kirwan, and P. F. D. Boesman (2020). Black Eagle (Ictinaetus malaiensis), version 1.0. In Birds of the World (J. del Hoyo, A. Elliott, J. Sargatal, D. A. Christie, and E. de Juana, Editors). Cornell Lab of Ornithology, Ithaca, NY, USA. https://doi.org/10.2173/bow.blaeag1.01"
  },
];

export default speciesData;
