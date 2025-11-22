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
    id: "shikra",
    name: "Shikra (0.58m)",
    wingspan_m: 0.58,
    variance: 0.10,
    source: "Ferguson-Lees, J., and D. A. Christie (2001). Raptors of the World. Christopher Helm, London, United Kingdom., as cited in Kemp, A. C. and G. M. Kirwan (2024). Shikra (Tachyspiza badia), version 1.1. In Birds of the World (J. del Hoyo, A. Elliott, J. Sargatal, D. A. Christie, and E. de Juana, Editors). Cornell Lab of Ornithology, Ithaca, NY, USA. https://doi.org/10.2173/bow.shikra1.01.1"
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
  {
    id: "bootedeagle",
    name: "Booted Eagle (1.225m)",
    wingspan_m: 1.255,
    variance: 0.125,
    source: "Ferguson-Lees, J., and D. A. Christie (2001). Raptors of the World. Christopher Helm, London, United Kingdom., as cited in Orta, J., P. F. D. Boesman, and J. S. Marks (2020). Booted Eagle (Hieraaetus pennatus), version 1.0. In Birds of the World (J. del Hoyo, A. Elliott, J. Sargatal, D. A. Christie, and E. de Juana, Editors). Cornell Lab of Ornithology, Ithaca, NY, USA. https://doi.org/10.2173/bow.booeag1.01"
  },
  {
    id: "tawnyeagle",
    name: "Tawny Eagle (1.71m)",
    wingspan_m: 1.71,
    variance: 0.12,
    source: "Ferguson-Lees, J., and D. A. Christie (2001). Raptors of the World. Christopher Helm, London, United Kingdom., as cited in Kemp, A. C. and G. M. Kirwan (2020). Tawny Eagle (Aquila rapax), version 1.0. In Birds of the World (J. del Hoyo, A. Elliott, J. Sargatal, D. A. Christie, and E. de Juana, Editors). Cornell Lab of Ornithology, Ithaca, NY, USA. https://doi.org/10.2173/bow.taweag1.01"
  },
  {
    id: "steppeeagle",
    name: "Steppe Eagle (1.90m)",
    wingspan_m: 1.90,
    variance: 0.24,
    source: "Ferguson-Lees, J., and D. A. Christie (2001). Raptors of the World. Christopher Helm, London, United Kingdom., as cited in Meyburg, B.-U., P. F. D. Boesman, J. S. Marks, and C. J. Sharpe (2020). Steppe Eagle (Aquila nipalensis), version 1.0. In Birds of the World (J. del Hoyo, A. Elliott, J. Sargatal, D. A. Christie, and E. de Juana, Editors). Cornell Lab of Ornithology, Ithaca, NY, USA. https://doi.org/10.2173/bow.steeag1.01"
  },
  {
    id: "bonelliseagle",
    name: "Bonelli's Eagle (1.60m)",
    wingspan_m: 1.60,
    variance: 0.16,
    source: "García, V., Moreon-Opo, R. and Tintó, A. (2013). Sex differentiation of Bonelli's Eagle Aquila fasciata in western Europe using morphometrics and plumage colour patterns. Ardeola. 60(2): 261-277., as cited in Orta, J., G. M. Kirwan, D. A. Christie, P. F. D. Boesman, J. S. Marks, and E. Garcia (2020). Bonelli's Eagle (Aquila fasciata), version 1.0. In Birds of the World (J. del Hoyo, A. Elliott, J. Sargatal, D. A. Christie, and E. de Juana, Editors). Cornell Lab of Ornithology, Ithaca, NY, USA. https://doi.org/10.2173/bow.boneag2.01"
  },
  {
    id: "greaterspottedeagle",
    name: "Greater Spotted Eagle (1.70m)",
    wingspan_m: 1.70,
    variance: 0.15,
    source: "https://en.wikipedia.org/wiki/Greater_spotted_eagle"
  },
];

export default speciesData;
