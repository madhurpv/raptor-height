import React from "react";
import Select from "react-select";
import "../styles/SpeciesSelector.css"; // new CSS file

export default function SpeciesSelector({ speciesList = [], selectedId, onSelect }) {
  const options = speciesList.map((s) => ({
    value: s.id || s.name,
    label: s.name || s.id,
  }));

  return (
    <div className="species-selector">
      <Select
        classNamePrefix="species"
        options={options}
        value={options.find((o) => o.value === selectedId) || null}
        onChange={(selected) => onSelect(selected ? selected.value : null)}
        placeholder="Search or select species..."
        isSearchable
        isClearable
      />
    </div>
  );
}
